import knex from 'knex';

export async function up(knex: knex) {
  return knex.schema.createTable('guilds', table => {
    table.string('id').primary();
    table.string('prefix').notNullable().defaultTo('.');
    table.string('best_t_channel');
    table.string('best_v_channel');
    table.integer('last_update');
  });
};

export async function down(knex: knex) {
  return knex.schema.dropTable('guilds');
};