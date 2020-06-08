import { Client } from 'discord.js';

import { BotEvent, ChannelData, MessageData, GuildData, GuildUserData } from "../types/types";
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
        const outChannels: ChannelData[] = await db('channels')
          .select('*')
          .where('last_update', '<=', Date.now() - (updateTimes.channels * 60 * 1000))
          .distinct();

        outChannels.map(async (channelData, index) => {
          const newChannelData: ChannelData = channelData;

          const lastMessages: MessageData[] = await db('messages')
            .select('*')
            .where('guild_id', '=', newChannelData.guild_id)
            .where('channel_id', '=', newChannelData.id)
            .where('created_at', '>=', Date.now() - (60 * 60 * 1000))
            .distinct();

          newChannelData.average = lastMessages.length / 60;
          newChannelData.msg_per_hour = lastMessages.length;
          newChannelData.last_update = Date.now();

          await db('channels').where('id', '=', newChannelData.id).update(newChannelData);
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

          const guildChannels: ChannelData[] = await db('channels')
            .select('*')
            .where('guild_id', '=', newGuildData.id)
            .distinct();

          // Verificar se o servidor tem canais
          if (guildChannels.length > 0) {
            newGuildData.best_t_channel = guildChannels
              .filter(guild => guild.type === 'text')
              .sort((a, b) => b.average - a.average)[0].id;
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