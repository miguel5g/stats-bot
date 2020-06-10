import knex from 'knex';

export async function up(knex: knex) {
  return knex.schema.createTable('guilds', table => {
    table.string('id').primary();
    table.string('prefix').notNullable().defaultTo('.');
    table.string('best_t_channel');
    table.string('best_v_channel');
    table.string('worse_t_channel');
    table.string('worse_v_channel');
    table.string('most_active_user');
    table.string('less_active_user');
    table.integer('day_messages').notNullable().defaultTo(0);
    table.integer('joined_amount').notNullable().defaultTo(0);
    table.integer('quited_amount').notNullable().defaultTo(0);
    table.integer('last_update').notNullable().defaultTo(0);
  });
};

export async function down(knex: knex) {
  return knex.schema.dropTable('guilds');
};