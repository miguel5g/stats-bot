import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('guilds').insert({
    id: '587672157379624988',
    prefix: '!',
  });
};