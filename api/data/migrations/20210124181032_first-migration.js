exports.up = async (knex) => {
  await knex.schema
    .createTable('roles', (roles) => {
      roles.increments('role_id')
      
      roles.string('role_name')
      .notNullable()
      .unique();

      roles.string('role_description')
    })
    .createTable('users', (users) => {
      users.increments('user_id')
      
      users.string('username')
      .notNullable()
      .unique();
      
      users.string('password')
      .notNullable()
      
      users.integer('role_id')
      .unsigned()
      .notNullable()
      .references('role_id')
      .inTable('roles')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    })
    .createTable('decks', (decks) => {
      decks.increments('deck_id')
      
      decks.string('deck_name')
      .notNullable()
      
      decks.string('deck_color')
      .notNullable()
      
      decks.string('deck_description')
      
      decks.integer('user_id')
      .unsigned()
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    })
    .createTable('panels', (panels) => {
      panels.increments('panel_id')
      
      panels.string('panel_text');
            
      panels.string('panel_notes')
    })
    .createTable('cards', (cards) => {
      cards.increments('card_id')

      cards.integer('card_stack_order')
      
      cards.integer('deck_id')
      .unsigned()
      .notNullable()
      .references('deck_id')
      .inTable('decks')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
      
      cards.integer('panel_a_id')
      .unsigned()
      .notNullable()
      .references('panel_id')
      .inTable('panels')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
      
      cards.integer('panel_b_id')
      .unsigned()
      .notNullable()
      .references('panel_id')
      .inTable('panels')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    });
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('cards');
  await knex.schema.dropTableIfExists('panels');
  await knex.schema.dropTableIfExists('decks');
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('roles');
}
