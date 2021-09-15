const router = require('express').Router();
const Deck = require('./decks-model');

router.get('/', async (req, res, next) => {
  try {
    const decks = await Deck.query(req.query);
    res.status(200).json(decks);
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