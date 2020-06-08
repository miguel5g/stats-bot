import Knex from 'knex';
import { GuildUserData } from '../../types/types';

const users: GuildUserData[] = [
  { user_id: '226803813959467009', action: 'quit', date: Date.now(), guild_id: '587672157379624988', username: 'PT'},
  { user_id: '226803813959467009', action: 'join', date: Date.now(), guild_id: '587672157379624988', username: 'PT'},
];

export async function seed(knex: Knex) {
  await knex('guilds_users').insert(users);
};