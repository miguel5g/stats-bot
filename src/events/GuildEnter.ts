import { Guild } from 'discord.js';

import { BotEvent, TextChannelData, VoiceChannelData, CreateGuildData } from "../types/types";
import db from '../database/Connection';

const event: BotEvent = {
  name: 'GuildEnter',
  description: 'Evento chamado quando o Bot entra em uma nova guild',
  caller: 'guildCreate',
  enable: true,
  run: async (Bot, guild: Guild) => {
    const newGuild: CreateGuildData = {
      id: guild.id,
    };

    await db('guilds').insert(newGuild);

    const guildTextChannels: TextChannelData[] = [];
    const guildVoiceChannels: VoiceChannelData[] = [];

    guild.channels.cache.forEach(channel => {
      if (channel.type === 'text') {
        guildTextChannels.push({
          id: channel.id,
          guild_id: guild.id,
          average: 0,
          msg_per_hour: 0,
          last_update: 0,
        });
      } else if (channel.type === 'voice') {
        guildVoiceChannels.push({
          id: channel.id,
          guild_id: guild.id,
          average: 0,
          conversation_hours: 0,
          last_update: 0,
        });
      }
    });

    await db('text_channels').insert(guildTextChannels);
    await db('voice_channels').insert(guildVoiceChannels);

    console.log('Entrei em um novo servidor');
  },
};

export default event;