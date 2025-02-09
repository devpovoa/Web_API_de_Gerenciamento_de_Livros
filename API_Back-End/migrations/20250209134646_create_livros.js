/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
 return knex.schema.createTable('livros', function (table) {
  table.increments('id').primary();
  table.string('titulo').notNullable();
  table.string('autor').notNullable();
  table.integer('ano').notNullable();
  table.decimal('preco', 10, 2).notNullable();
  table.string('foto', 500);
  table.boolean('ativo').defaultTo(true);
 });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
 return knex.schema.dropTable('livros');
};
