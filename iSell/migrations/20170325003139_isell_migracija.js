
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user',
                                 function(table) {
                                   table.increments('id').primary();
                                   table.string('username');
                                   table.string('password');
                                   table.string('email');
                                 })
      .createTable('auction',
                   function(table) {
                     table.increments('id').primary();
                     table.date('date_from');
                     table.date('date_to');
                     table.string('auction_name');
                     table.string('auction_item');
                     table.string('item_description');
                     table.decimal('price');
                     table.string('category');
                     table.integer('user_id').references('id').inTable('user');
                     table.decimal('lat');
                     table.decimal('long');
                   })
      .createTable(
          'pictures',
          function(table) {
            table.increments('id').primary();
            table.string('picture_url');
            table.integer('auction_id').references('id').inTable('auction');
          })
      .createTable('auction_bids', function(table) {
        table.increments('id').primary();
        table.integer('user_id').references('id').inTable('user');
        table.integer('auction_id').references('id').inTable('auction');
        table.decimal('value');
      });
};

exports.down = function(knex, Promise) {
  return knex.dropTable('user')
      .dropTable('auction')
      .dropTable('pictures')
      .dropTable('auction_bids');
};
