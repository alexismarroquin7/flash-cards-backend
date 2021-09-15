const { panels } = require('../sample-data/panels');

exports.seed = function(knex) {
  return knex('panels').insert(panels);
};