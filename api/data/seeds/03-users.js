const {users} = require('../sample-data/users');

exports.seed = function(knex) {
  return knex('users').insert(users);
};