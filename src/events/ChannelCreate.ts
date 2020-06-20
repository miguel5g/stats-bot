import { Channel } from "discord.js";

import { BotEvent, TextChannelData, VoiceChannelData } from "../types/types";
import db from '../database/Connection';

const event: BotEvent = {
  name: 'ChannelCreate',
  description: 'Evento chamado quando um canal é criado',
  caller: 'channelCreate',
  enable: true,
  run: async (Bot, channel: Channel) => {
    if (channel.type === 'text') {
      // Dados do novo canal
      const newChannel: TextChannelData = {
        id: channel.id,
        /* Se ele é do tipo text então vai ter a propriedade guild */
        // @ts-ignore
        guild_id: channel.guild.id,
        average: 0,
        msg_per_hour: 0,
        last_update: 0,
      };

      await db('text_channels').insert(newChannel);
    } else if (channel.type === 'voice') {
      // Dados do novo canal
      const newChannel: VoiceChannelData = {
        id: channel.id,
        /* Se ele é do tipo voice então vai ter a propriedade guild */
        // @ts-ignore
        guild_id: channel.guild.id,
        average: 0,
        conversation_time: 0,
        last_update: 0,
      };

      await db('voice_channels').insert(newChannel);
    }
  },
};

export default event;