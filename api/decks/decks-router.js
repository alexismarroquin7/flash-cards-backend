const router = require('express').Router();

const Deck = require('./decks-model');
const { validateDeckSchema, validateDeckIdExists } = require('./decks-middleware');

router.get('/', async (req, res, next) => {
  try {
    const decks = await Deck.query(req.query);
    res.status(200).json(decks);
  } catch (err) {
    next(err);
  }
});

router.post('/', validateDeckSchema, async (req, res, next) => {
  try {
    const deck = await Deck.create({ ...req.body, user_id: req.decodedToken.subject });
    res.status(200).json(deck);
  } catch (err) {
    next(err);
  }
});

router.get('/:deck_id', validateDeckIdExists, (req, res) => {
  res.status(200).json(req.deck);
});

router.delete('/:deck_id', validateDeckIdExists, async (req, res, next) => {
  try {
    const [ deletedDeck ] = await Deck.deleteById(req.deck.deck_id);
    res.status(200).json({
      deck_id: deletedDeck.deck_id
    });

  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  });
});


module.exports = router;