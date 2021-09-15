exports.up = async (knex) => {
  await knex.schema
    .createTable('roles', (roles) => {
      roles.increments('role_id')
      
      roles.string('role_name')
      .notNullable()
      .unique();

      roles.string('role_description')
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('roles')
}
