const {roles} = require('../sample-data/roles');

exports.seed = function(knex) {
  return knex('roles').insert(roles);
};
