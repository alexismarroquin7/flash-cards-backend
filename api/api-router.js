const router = require('express').Router();
const rolesRouter = require('./roles/roles-router');
const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');
const decksRouter = require('./decks/decks-router');


router.use('/roles', rolesRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/decks', decksRouter);

module.exports = router;