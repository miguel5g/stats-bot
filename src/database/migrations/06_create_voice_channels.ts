import knex from 'knex';

export async function up(knex: knex) {
  return knex.schema.createTable('voice_channels', table => {
    table.string('id').primary();
    table.string('guild_id')
      .notNullable()
      .references('id')
      .inTable('guilds');
    table.float('average').notNullable();
    table.integer('conversation_hours').notNullable();
    table.integer('last_update').notNullable();
  });
};

export async function down(knex: knex) {
  return knex.schema.dropTable('channels');
};