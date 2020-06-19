import knex from 'knex';

export async function up(knex: knex) {
  return knex.schema.createTable('users', table => {
    table.string('id').primary();
    table.string('username').notNullable();
    table.integer('conversation_time').notNullable().defaultTo(0);
  });
};

export async function down(knex: knex) {
  return knex.schema.dropTable('users');
};