const { decks } = require('../sample-data/decks');

exports.seed = function(knex) {
  return knex('decks').insert(decks);
};