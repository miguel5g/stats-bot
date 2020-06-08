import { GuildMember } from "discord.js";

import { BotEvent, GuildUserData } from "../types/types";
import db from '../database/Connection';

const event: BotEvent = {
  name: 'GuildMemberRemove',
  description: 'Evento chamado quando alguém sai no servidor',
  caller: 'guildMemberRemove',
  enable: true,
  run: async (Bot, member: GuildMember) => {
    const user: GuildUserData = await db('guilds_users')
      .select('*')
      .where('user_id', '=', member.id)
      .whereRaw('action = \'quit\'')
      .first();

    if (user) return;

    const newUser: GuildUserData = {
      user_id: member.id,
      username: member.user.username,
      guild_id: member.guild.id,
      action: 'quit',
      date: Date.now(),
    };

    await db('guilds_users').insert(newUser);
  },
};

export default event;