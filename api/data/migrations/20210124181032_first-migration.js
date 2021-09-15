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
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users')
  await knex.schema.dropTableIfExists('roles')
}
