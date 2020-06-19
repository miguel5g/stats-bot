import { VoiceState } from "discord.js";

import { BotEvent, UserData, UserActiveData, VoiceChannelData } from "../types/types";
import db from '../database/Connection';

const event: BotEvent = {
  name: 'VoiceUpdate',
  description: 'Evento relacioinado a canais de voz',
  caller: 'voiceStateUpdate',
  enable: true,
  run: (Bot, [oldVoiceState, newVoiceState]: VoiceState[]) => {
    // Verificar qual foi a ação do usuário e chamar a função correspondente
    if (!oldVoiceState.channel && newVoiceState.channel) voiceJoin();

    if (oldVoiceState.channel && !newVoiceState.channel) voiceQuit();

    if (oldVoiceState.channel && newVoiceState.channel) voiceChange();

    // Funções principais
    function voiceJoin() {
      if (!checkChannelState(newVoiceState.channel!.id)) createChannelState(newVoiceState.channel!.id);

      Bot.voiceUsers.set(newVoiceState.member!.id, { channel_id: newVoiceState.channel!.id, started_at: Date.now() });
    };

    async function voiceQuit() {
      // Verificar quantas pessoas sobraram no canal e finalizar
      if (checkChannelUsers(oldVoiceState.channel!.id, oldVoiceState.guild.id) <= 0) {
        endChannelState(oldVoiceState.channel!.id);
      }

      // Tempo de conexao do usuário
      const conTime = Date.now() - Bot.voiceUsers.get(oldVoiceState.member!.id)!.started_at;

      // Deletar dados salvos em cache
      Bot.voiceUsers.delete(oldVoiceState.member!.id);

      // Verificar se o tempo conectado foi maior que 30s
      if (conTime <= 30000) return;

      // Dados do usuário
      const userData: UserData = await db('users').select('*').where('id', '=', oldVoiceState.member!.id).first();

      // Verificar se o usuário existe, se não criar um com dados atualizados
      if (!userData) {
        const newUserData: UserData = {
          id: oldVoiceState.member!.id,
          username: oldVoiceState.member!.user.username,
          conversation_time: conTime,
        };

        await db('users').insert(newUserData);
      } else {
        userData.conversation_time += conTime;

        await db('users').where('id', '=', userData.id).update(userData);
      }

      // Criar novo registro de atividade
      const newUserActive: UserActiveData = {
        user_id: oldVoiceState.member!.id,
        channel_id: oldVoiceState.channel!.id,
        guild_id: oldVoiceState.guild.id,
        action: 'quit_voice_channel',
        created_at: Date.now(),
      };

      // Adicionar no db
      await db('users_active').insert(newUserActive);
    };

    function voiceChange() {
      // Verificar quantas pessoas sobraram no canal e finalizar
      if (checkChannelUsers(oldVoiceState.channel!.id, oldVoiceState.guild.id) <= 0) {
        endChannelState(oldVoiceState.channel!.id);
      }

      // Atualizar id do canal conectado
      const oldUserState = Bot.voiceUsers.get(oldVoiceState.member!.id)!;
      Bot.voiceUsers.set(oldVoiceState.member!.id, { ...oldUserState, channel_id: oldVoiceState.channel!.id });
    };

    // Verificar se o canal já estava sendo usado
    function checkChannelState(id: string): boolean {
      let result = false;

      if (Bot.voiceChannels.get(id)) result = true;

      return result;
    };

    // Retorna a quantidade de usuários no canal
    function checkChannelUsers(id: string, guildId: string): number {
      return Bot.guilds.cache.get(guildId)!.channels.cache.get(id)!.members.size;
    };

    // Criar o state do canal
    function createChannelState(id: string): void {
      Bot.voiceChannels.set(id, Date.now());
    };

    // Finalizar estatisticas do canal
    async function endChannelState(id: string) {
      // Tempo que o canal foi usado
      const channelUseTime = Date.now() - Bot.voiceChannels.get(id)!;

      // Verificar se o tempo de uso foi menos de 30 segundos
      if (channelUseTime <= 30000) return;

      // Buscar dados do canal
      const channelData: VoiceChannelData = await db('voice_channels')
        .select('*')
        .where('id', '=', id)
        .first();
      
      // Atualizar dados
      channelData.conversation_time += channelUseTime;

      // Salvar
      await db('voice_channels').where('id', '=', id).update(channelData);
    };
  },
};

export default event;