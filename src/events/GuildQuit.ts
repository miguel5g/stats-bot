import { Guild } from 'discord.js';

import { BotEvent } from "../types/types";
import db from '../database/Connection';

const event: BotEvent = {
  name: 'GuildQuit',
  description: 'Evento chamado quando o Bot sai de uma guild',
  caller: 'guildDelete',
  enable: true,
  run: async (Bot, guild: Guild) => {
    await db('guilds').where('id', '=', guild.id).delete();

    await db('text_channels').where('guild_id', '=', guild.id).delete();
    await db('voice_channels').where('guild_id', '=', guild.id).delete();

    await db('messages').where('guild_id', '=', guild.id).delete();

    await db('guilds_users').where('guild_id', '=', guild.id).delete();

    await db('users_active').where('guild_id', '=', guild.id).delete();

    console.log('Saí de um servidor');
  },
};

export default event;