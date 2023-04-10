/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("students",(table)=>{
        table.biginteger("ra").primary();
        table.string("name").notNull();
        table.string("email").notNull();
        table.integer("cpf").notNull();
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("students");
  
};
