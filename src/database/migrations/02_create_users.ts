import knex from 'knex';

export async function up(knex: knex) {
  return knex.schema.createTable('users', table => {
    table.string('id').primary();
    table.string('username').notNullable();
  });
};

export async function down(knex: knex) {
  return knex.schema.dropTable('users');
};