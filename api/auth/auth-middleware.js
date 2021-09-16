const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../secrets/jwt-secret');

const restricted = (req, res, next) => {
  const token = req.headers.authorization;

  if(!token){
    res.status(401).json({ message: "Token required" });
  
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
  
      if(err){
        res.status(401).json({ message: "Token invalid" });
  
      } else {
        req.decodedToken = decoded;
        next();
      }
    });
  }
}

const only = role => (req, res, next) => {
  if(typeof role === 'string'){
    req.decodedToken.role === role
      ? next()
      : next({
        message: `only accessible to ${role}`
      });
  
  } else {
    let authorized = 0;
    let rolesLength = role.length;
    let roles = '';
    
    role.map((role_name, i) => {
    req.decodedToken.role === role_name
      ? authorized += 1
      : authorized += 0
      
    i === rolesLength - 1
      ? roles += `or ${role_name}`
      : roles += `${role_name}, `
      
    });

    authorized === 1
      ? next()
      : next({
        message: `only accessible to ${roles}`,
        status: 401
      });

  }
}

module.exports = {
  restricted,
  only
}