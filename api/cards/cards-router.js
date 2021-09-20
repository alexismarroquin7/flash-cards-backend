const router = require('express').Router();
const { validateSortQuery, validateDeckIdQuery, validateCardIdExists, validateCardModel, validateDeckExistsByDeckId } = require('./cards-middleware');
const Card = require('./cards-model');

router.get('/', validateSortQuery, validateDeckIdQuery, async (req, res, next) => {
  try {
    const card = await Card.findAll(req.query);
    res.status(200).json(card);

  } catch(err){
    next(err)
  }

});

router.get('/:card_id', validateCardIdExists, (req, res) => {
  res.status(200).json(req.card);
});

router.post('/', validateCardModel, validateDeckExistsByDeckId, async(req, res, next) => {
  try  {
    const card = await Card.create(req.body);
    res.status(201).json(card);
  } catch (err) {
    next(err);
  }
});

router.delete('/:card_id', validateCardIdExists, async (req, res, next) => {
  try {
    const deletedCard = await Card.deleteById(req.card.card_id);
    
    res.status(200).json({
      card_id: deletedCard.card_id
    });
  
  } catch(err) {
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