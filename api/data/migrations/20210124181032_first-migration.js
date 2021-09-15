exports.up = async (knex) => {
  await knex.schema
    .createTable('roles', (users) => {
      users.increments('role_id')
      
      users.string('role_name')
      .notNullable()
      .unique();

      users.string('role_description')
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('roles')
}
