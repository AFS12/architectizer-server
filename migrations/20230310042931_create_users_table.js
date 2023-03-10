/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id');
        table.string('name', 100).notNullable();
        table.string('email', 200).notNullable().unique();
        table.string('password', 60).notNullable();
        table.string('phone', 45).notNullable();
        table.string('gender', 1).notNullable();
        table.integer('age').notNullable();
        table.string('type', 1).notNullable();
        table.date('created_at').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
