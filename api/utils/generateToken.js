const JWT_SECRET = require('../secrets/jwt-secret');
const jwt = require('jsonwebtoken');

module.exports = function(user){
  const { user_id, username, role } = user;
  const payload = {
    subject: user_id,
    username, 
    role
  };

  const options = {
    expiresIn: '1h'
  };
  
  return jwt.sign(payload, JWT_SECRET, options);
};
