import knex from 'knex';

export async function up(knex: knex) {
  return knex.schema.createTable('users_active', table => {
    table.increments('id').primary();
    table.string('user_id').notNullable();
    table.string('channel_id').notNullable();
    table.string('guild_id').notNullable();
    table.string('action').notNullable();
    table.integer('created_at').notNullable().defaultTo(0);
  });
};

export async function down(knex: knex) {
  return knex.schema.dropTable('users_active');
};