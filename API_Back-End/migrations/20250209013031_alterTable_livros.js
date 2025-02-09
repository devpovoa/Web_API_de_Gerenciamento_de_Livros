/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
 return knex.schema.alterTable('livros', function (table) {
  table.boolean('ativo').defaultTo(true);
 });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
 return knex.schema.dropTable('livros', function (table) {
  table.dropColumn('ativo');
 });
};
