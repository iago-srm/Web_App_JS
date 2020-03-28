
//npx knex migrate:latest para executar a última migration

exports.up = function(knex) {
  return knex.schema.createTable('ongs', function(table) {
      table.string('id').primary();
      table.string('nome').notNullable();
      table.string('email').notNullable();
      table.string('whatsapp').notNullable();
      table.string('cidade').notNullable();
      table.string('uf', 2).notNullable(); //Tamanho da string = 2
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs'); //Desfaz a tabela
};
