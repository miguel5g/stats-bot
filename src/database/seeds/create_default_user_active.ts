import Knex from 'knex';
import { UserActiveData } from '../../types/types';

const usersActive: UserActiveData[] = [
  { user_id: '226803813959467009', channel_id: '718980310766977054', guild_id: '587672157379624988', action: 'send_message', created_at: Date.now()},
  { user_id: '226803813959467009', channel_id: '718980310766977054', guild_id: '587672157379624988', action: 'send_message', created_at: Date.now()},
  { user_id: '226803813959467009', channel_id: '718980310766977054', guild_id: '587672157379624988', action: 'send_message', created_at: Date.now()},
];

export async function seed(knex: Knex) {
  await knex('users_active').insert(usersActive);
};