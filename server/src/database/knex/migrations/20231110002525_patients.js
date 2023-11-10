exports.up = (knex) =>
  knex.schema.createTable("patients", (table) => {
    table.increments("id");
    table.text("name").notNullable();
    table.date("birth_date").notNullable();
    table.text("email").notNullable();
    table.text("address").notNullable();
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("patients");
