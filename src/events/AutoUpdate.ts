import { Client } from 'discord.js';

import { BotEvent, TextChannelData, MessageData, GuildData, GuildUserData, UserActiveData } from "../types/types";
import db from '../database/Connection';

const updateTimes = {
  guilds: 25,
  channels: 15,
  verify: 10,
};

class Data {
  private Bot: Client;

  constructor(Bot: Client) {
    this.Bot = Bot
  };

  async updateChannels(): Promise<any> {
    const updatePromisse = new Promise(async (resolve: Function, reject: Function) => {
      try {
        const outChannels: TextChannelData[] = await db('text_channels')
          .select('*')
          .where('last_update', '<=', Date.now() - (updateTimes.channels * 60 * 1000))
          .distinct();

        outChannels.map(async (channelData, index) => {
          const newChannelData: TextChannelData = channelData;

          const lastMessages: MessageData[] = await db('messages')
            .select('*')
            .where('guild_id', '=', newChannelData.guild_id)
            .where('channel_id', '=', newChannelData.id)
            .where('created_at', '>=', Date.now() - (60 * 60 * 1000))
            .distinct();

          newChannelData.average = lastMessages.length / 60;
          newChannelData.msg_per_hour = lastMessages.length;
          newChannelData.last_update = Date.now();

          await db('text_channels').where('id', '=', newChannelData.id).update(newChannelData);
          if (index + 1 === outChannels.length) resolve();
        });

        if (outChannels.length <= 0) resolve();
      } catch (err) {
        reject(err);
      }
    });

    return updatePromisse;
  };

  async updateGuilds(): Promise<any> {
    const updatePromisse: Promise<any> = new Promise(async (resolve: Function, reject: Function) => {
      try {
        // Buscar todos servidores atualizados a mais de 25min
        const outGuilds: GuildData[] = await db('guilds')
          .select('*')
          .where('last_update', '<=', Date.now() - (updateTimes.guilds * 60 * 1000))
          .distinct();

        // 
        outGuilds.map(async (GuildData, index) => {
          const newGuildData: GuildData = GuildData;

          const guildTextChannels: TextChannelData[] = await db('text_channels')
            .select('*')
            .where('guild_id', '=', newGuildData.id)
            .distinct();

          const guildVoiceChannels: TextChannelData[] = await db('voice_channels')
            .select('*')
            .where('guild_id', '=', newGuildData.id)
            .distinct();

          // Verificar se o servidor tem canais
          if (guildTextChannels.length > 0) {
            // Canais de texto
            newGuildData.best_t_channel = guildTextChannels
              .sort((a, b) => b.average - a.average)[0].id;
            newGuildData.worse_t_channel = guildTextChannels
              .sort((a, b) => a.average - b.average)[0].id;

            // Canais de voz
            /* newGuildData.best_v_channel = ''; */
          };

          // Salvar a ultima vez que foi atualizada
          newGuildData.last_update = Date.now();

          // Buscar os usuários que entraram nas ultimas 24h
          const guildUsers: GuildUserData[] = await db('guilds_users')
            .select('*')
            .where('guild_id', '=', newGuildData.id)
            .where('date', '>=', Date.now() - (1000 * 60 * 60 * 24))
            .distinct();

          newGuildData.joined_amount = guildUsers
            .filter(user => user.action === 'join').length;

          newGuildData.quited_amount = guildUsers
            .filter(user => user.action === 'quit').length;

          const guildMessages: MessageData[] = await db('messages')
            .select('*')
            .where('guild_id', '=', newGuildData.id)
            .where('created_at', '>=', Date.now() - (1000 * 60 * 60 * 1));

          newGuildData.day_messages = guildMessages.length;

          // Atualizar usuários mais ativos
          const usersActive: UserActiveData[] = await db('users_active')
            .select('*')
            .where('guild_id', '=', newGuildData.id)
            .where('created_at', '>=', Date.now() - (1000 * 60 * 60 * 24 * 10));

          const serializedUsersActive = {};

          usersActive.map(active => {
            // @ts-ignore
            if (serializedUsersActive[active.user_id]) {
              // @ts-ignore
              serializedUsersActive[active.user_id].push(active);
            } else {
              // @ts-ignore
              serializedUsersActive[active.user_id] = [active];
            }
          });

          const filteredUsersActive = Object.keys(serializedUsersActive).map(key => {
            return {
              user_id: key,
              // @ts-ignore
              active_amount: serializedUsersActive[key].length
            };
          }).sort((a, b) => b.active_amount - a.active_amount);

          newGuildData.most_active_user  = filteredUsersActive[0].user_id;
          newGuildData.less_active_user = filteredUsersActive.reverse()[0].user_id;

          // Salvar novas infos
          await db('guilds').where('id', '=', newGuildData.id).update(newGuildData);

          // Finalizar a promise se essa for a ultima
          if (index + 1 === outGuilds.length) resolve();
        });

        if (outGuilds.length <= 0) resolve();
      } catch (err) {
        reject(err);
      }

      return updatePromisse;
    });
  };
};

interface Status {
  channels: boolean,
  guilds: boolean,
};

const event: BotEvent = {
  name: 'DataManage',
  description: 'Atualizar banco de dados',
  caller: 'ready',
  enable: true,
  run: (Bot) => {


    const dataManage = new Data(Bot);

    // Status se já finalizou a ultima atualização
    const status: Status = {
      channels: true,
      guilds: true,
    };

    setInterval(async () => {
      if (status.channels) {
        status.channels = false;
        const update = dataManage.updateChannels();
        await update;
        status.channels = true;
      }

      if (status.guilds) {
        status.guilds = false;
        const update = dataManage.updateGuilds();
        await update;
        status.guilds = true;
      }
    }, updateTimes.verify * 60 * 1000)

  },
};

export default event;