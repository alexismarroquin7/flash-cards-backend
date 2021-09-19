const Deck = require('../decks/decks-model');
const Card = require('../cards/cards-model');

const validateSortQuery = (req, res, next) => {
  if(req.query.sort && req.query.sort === 'asc' || req.query.sort === 'desc'){
    next();
    
  } else {
    next({
      status: 400,
      message: `{sort} query must be 'asc' or 'desc'`
    });
  }
}

const validateDeckIdQuery = async (req, res, next) => {

  if(req.query.deck_id){
    try {
      const [ deck ] = await Deck.findById(Number(req.query.deck_id));
      
      if(deck && deck.length !== 0){
        req.deck = deck;
        next();
    
      } else {
        next({
          status: 404,
          message: `deck of id ${req.query.deck_id} was does not exist`
        });
      }
    } catch (err) {
      next(err)
    }

  } else {
    next();
  }
}

const validateCardIdExists = async (req, res, next) => {
  const { card_id } = req.params;

  try {
    if(Number.isNaN(Number(card_id))){
      next({
        status: 400,
        message: '{card_id} must be a number'
      })

    } else {
      const card = await Card.findById(card_id);
      
      if(card){
        req.card = card;
        next();
      } else {
        next({
          status: 404,
          message: `card of id ${card_id} does not exist`
        })
      }

    }
  } catch(err) {
    next(err);
  }
}


module.exports = {
  validateSortQuery,
  validateDeckIdQuery,
  validateCardIdExists
}