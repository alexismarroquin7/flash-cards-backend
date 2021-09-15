const router = require('express').Router();
const rolesRouter = require('./roles/roles-router');
const usersRouter = require('./users/users-router');

router.use('/roles', rolesRouter);
router.use('/users', usersRouter);

module.exports = router;