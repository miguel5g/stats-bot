import { GuildMember } from "discord.js";

import { BotEvent, GuildUserData } from "../types/types";
import db from '../database/Connection';

const event: BotEvent = {
  name: 'GuildMemberAdd',
  description: 'Evento chamado quando alguém entra no servidor',
  caller: 'guildMemberAdd',
  enable: true,
  run: async (Bot, member: GuildMember) => {
    const user: GuildUserData = await db('guilds_users')
      .select('*')
      .where('user_id', '=', member.id)
      .whereRaw('action = \'join\'')
      .first();

    if (user) return;

    const newUser: GuildUserData = {
      user_id: member.id,
      username: member.user.username,
      guild_id: member.guild.id,
      action: 'join',
      date: Date.now()
    }

    await db('guilds_users').insert(newUser);
  },
};

export default event;