import knex from 'knex';

export async function up(knex: knex) {
  return knex.schema.createTable('messages', table => {
    table.string('id').primary();
    table.string('guild_id')
      .notNullable()
      .references('id')
      .inTable('guilds');
    table.string('channel_id')
      .notNullable()
      .references('id')
      .inTable('channels');
    table.string('user_id')
      .notNullable()
      .references('id')
      .inTable('users');
    table.integer('created_at').notNullable();
  });
};

export async function down(knex: knex) {
  return knex.schema.dropTable('messages');
};