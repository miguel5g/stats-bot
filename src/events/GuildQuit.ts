import { Guild } from 'discord.js';

import { BotEvent, GuildData, ChannelData } from "../types/types";
import db from '../database/Connection';

const event: BotEvent = {
  name: 'GuildEnter',
  description: 'Evento chamado quando o Bot entra em uma nova guild',
  caller: 'guildDelete',
  enable: true,
  run: async (Bot, guild: Guild) => {
    await db('guilds').delete().where('id', '=', guild.id);

    await db('channels').delete().where('guild_id', '=', guild.id);

    await db('messages').delete().where('guild_id', '=', guild.id);

    await db('guilds_users').delete().where('guild_id', '=', guild.id);

    await db('users_active').delete().where('guild_id', '=', guild.id);

    console.log('Saí de um servidor');
  },
};

export default event;