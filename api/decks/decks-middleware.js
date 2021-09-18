const Deck = require('./decks-model');

const validateDeckSchema = (req, res, next) => {
  const { deck_name, deck_color } = req.body;

  if(!deck_name || !deck_color){
    next({
      status: 400,
      message: '{deck_name} and {deck_color} are required',
    });

  } else {
    next();
  }
  
};

const validateDeckIdExists = async (req, res, next) => {
  const { deck_id } = req.params;

  try {
    const [ deck ] = await Deck.findById(Number(deck_id));
    
    if(deck && deck.length !== 0){
      req.deck = deck;
      next();
    } else {
      next({
        status: 404,
        message: `deck of id ${deck_id} was does not exist`
      });
    }
  } catch (err) {
    next(err)
  }
};

module.exports = {
  validateDeckSchema,
  validateDeckIdExists
}