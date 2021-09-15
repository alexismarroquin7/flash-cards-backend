const { cards } = require('../sample-data/cards');

exports.seed = function(knex) {
  return knex('cards').insert(cards);
};