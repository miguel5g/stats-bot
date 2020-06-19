import { Message } from 'discord.js';

import { BotEvent, GuildData, MessageData, UserData, TextChannelData, UserActiveData } from "../types/types";
import db from '../database/Connection';

const event: BotEvent = {
  name: 'WatchMessage',
  description: 'Evento chamado quando alguém envia uma messagem',
  caller: 'message',
  enable: true,
  run: async (Bot, msg: Message) => {
    // Verificar se foi um bot que enviou
    if (msg.author.bot) return;

    // Verificar se foi enviado em dm
    if (msg.channel.type === 'dm') return;

    // Verificar se foi um comando
    let guildData: GuildData = await db('guilds')
      .select('*')
      .where('id', '=', msg.guild?.id || 'default')
      .first();

    // Gerar um erro se não existir no banco de dados
    if (!guildData) return console.error(new Error('Guild not found in database'));

    // Verificar se inicia com a prefix do servidor
    // @ts-ignore
    if (msg.content.startsWith(guildData.prefix)) return;

    const message: MessageData = {
      id: msg.id,
      guild_id: msg.guild?.id || 'default',
      channel_id: msg.channel.id,
      user_id: msg.author.id,
      created_at: Date.now(),
    };

    // Inserir a nova mensagem no banco de dados
    await db('messages').insert(message);

    // Verificar se o usuário existe
    const userData: UserData = await db('users')
      .select('*')
      .where('id', '=', msg.author.id)
      .first();

    // Se não existir criar novo usuário
    if (!userData) {
      const user: UserData = {
        id: msg.author.id,
        username: msg.author.username,
        conversation_time: 0,
      };

      await db('users').insert(user);
    }

    // Procurar canal
    const result = await db('text_channels').where('id', '=', msg.channel.id).first();

    // Verificar se canal existe no banco de dados e se não cria-lo
    if (!result) {
      const newChannel: TextChannelData = {
        id: msg.channel.id,
        guild_id: message.guild_id,
        average: 0,
        msg_per_hour: 0,
        last_update: Date.now(),
      };

      await db('text_channels').insert(newChannel);
    }

    // Adicionar atividade
    if (msg.author.lastMessage && (Date.now() - msg.author.lastMessage.createdTimestamp) / 1000 <= 2) {
      const userActive: UserActiveData = {
        user_id: msg.author.id,
        channel_id: msg.channel.id,
        guild_id: msg.guild?.id || '',
        action: 'send_message',
        created_at: Date.now()
      };

      await db('users_active').insert(userActive);
    }
  },
};

export default event;