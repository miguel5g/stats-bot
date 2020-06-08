import knex from 'knex';

export async function up(knex: knex) {
  return knex.schema.createTable('guilds', table => {
    table.string('id').primary();
    table.string('prefix').notNullable().defaultTo('.');
    table.string('best_t_channel');
    table.string('best_v_channel');
    table.integer('joined_amount').notNullable().defaultTo(0);
    table.integer('quited_amount').notNullable().defaultTo(0);
    table.integer('last_update').notNullable().defaultTo(0);
  });
};

export async function down(knex: knex) {
  return knex.schema.dropTable('guilds');
};