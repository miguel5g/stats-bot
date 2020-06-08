import knex from 'knex';

export async function up(knex: knex) {
  return knex.schema.createTable('guilds_users', table => {
    table.increments('id').primary();
    table.string('user_id').notNullable();
    table.string('username').notNullable();
    table.string('guild_id')
      .notNullable()
      .references('id')
      .inTable('guilds');
    table.string('action').notNullable();
    table.integer('date').notNullable();
  });
};

export async function down(knex: knex) {
  return knex.schema.dropTable('guilds_users');
};