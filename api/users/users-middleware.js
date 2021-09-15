const User = require('./users-model');

const validateUserSchema = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password){
    next({
      status: 400,
      message: "username or password missing"
    });
    
  } else {
    const validUsername = username.match(/\w{2,32}/);
    const validPassword = password.match(/[.\S]{2,32}/);

    if(!validUsername) {
      next({
        status: 400,
        message: "username must be alphanumeric, 2-32 characters, no-spaces"
      });
    
    
    } else if(!validPassword) {
      next({
        status: 400,
        message: "password must be 2-32 characters"
      });
  
    } else {
      next();
    }
  }
};

const validateUsernameExists = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await User.findByUsername(username);

    if(user){
      req.user = user;
      next();

    } else {
      next({
        message: "user was not found",
        status: 404
      });
    }
  
  } catch(err) {
    next(err);
  }
};

const validateUserIdExists = async (req, res, next) => {
  
  const { user_id } = req.params;

  try {
    const user = await User.findById(user_id);
    
    if(user){
      req.user = user;
      next();
    
    } else {
      next({
        status: 401,
        message: `user of id ${user_id} does not exist`
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateUserSchema,
  validateUsernameExists,
  validateUserIdExists
};