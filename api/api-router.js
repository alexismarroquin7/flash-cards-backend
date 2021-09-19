const router = require('express').Router();
const rolesRouter = require('./roles/roles-router');
const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');
const deckRouter = require('./decks/decks-router');
const cardRouter = require('./cards/cards-router');

const { restricted } = require('./auth/auth-middleware');

router.use('/roles', rolesRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/decks', restricted, deckRouter);
router.use('/cards', restricted, cardRouter);

module.exports = router;