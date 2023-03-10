/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('services', function(table) {
        table.increments('id');
        table.integer('architect_id').notNullable();
        table.integer('client_id').notNullable();
        table.string('title', 60).notNullable();
        table.string('description', 300).notNullable();
        table.integer('status').notNullable();
        table.date('created_at').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('services');
};
