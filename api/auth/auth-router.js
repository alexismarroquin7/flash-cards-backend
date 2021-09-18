const router = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const {
  validateUserSchema,
  validateUsernameExists
} = require('../users/users-middleware');

router.post('/login', validateUserSchema, validateUsernameExists, (req, res, next) => {  // eslint-disable-line
  const { password } = req.body;

  if(bcrypt.compareSync(password, req.user.password)){

    const token = generateToken({
      user_id: req.user.user_id,
      username: req.user.username,
      role: req.user.role.role_name
    });

    res.status(200).json({
      user_id: req.user.user_id,
      username: req.user.username,
      role: {
        role_id: req.user.role.role_id,
        name: req.user.role.name
      },
      token,
      message: `welcome back, ${req.user.username}`
    });

  } else {
    next({
      status: 401,
      message: 'invalid credentials'
    });
  }
});

router.get('/logout', (req, res, next) => {  // eslint-disable-line
  const loggedIn = req.headers.authorization;

  if(loggedIn){
    next({
      status: 200,
      message: "logged out"
    });

  } else {
    next({
      status: 200,
      message: "not logged in"
    });

  }
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  });
});

module.exports = router;