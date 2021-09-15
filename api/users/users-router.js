const router = require('express').Router();
const User = require('./users-model');
const { validateUserIdExists } = require('./users-middleware');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch(err) {
    next(err);
  }
});

router.get('/:user_id', validateUserIdExists, async (req, res, next) => {
  res.status(200).json(req.user);
});



router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  });
});

module.exports = router;