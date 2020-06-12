import { Guild } from 'discord.js';

import { BotEvent, GuildData, ChannelData } from "../types/types";
import db from '../database/Connection';

const event: BotEvent = {
  name: 'GuildEnter',
  description: 'Evento chamado quando o Bot entra em uma nova guild',
  caller: 'guildCreate',
  enable: true,
  run: async (Bot, guild: Guild) => {
    const newGuild: GuildData = {
      id: guild.id,
    };

    await db('guilds').insert(newGuild);

    const guildChannels: ChannelData[] = [];
    guild.channels.cache.forEach(channel => {
      guildChannels.push({
        id: channel.id,
        guild_id: guild.id,
        type: channel.type,
        msg_per_hour: 0,
        average: 0,
        last_update: 0,
      });
    });

    await db('channels').insert(guildChannels);

    console.log('Entrei em um novo servidor');
  },
};

export default event;