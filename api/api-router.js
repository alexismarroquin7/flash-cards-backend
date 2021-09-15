const router = require('express').Router();
const rolesRouter = require('./roles/roles-router');

router.use('/roles', rolesRouter);

module.exports = router;