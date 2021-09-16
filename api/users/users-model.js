const db = require('../data/db-config');

const formatUsers = (rows) => {
  if(!rows){
    return rows;
  
  } else {
    if (Array.isArray(rows)){
      const users = rows.map(row => {
        return {
          user_id: row.user_id,
          username: row.username,
          password: row.password,
          role: {
            role_id: row.role_id,
            name: row.role_name
          }
        }
      });
  
      return users;
    
    } else {  
      const user = {
        user_id: rows.user_id,
        username: rows.username,
        password: rows.password,
        role: {
          role_id: rows.role_id,
          name: rows.role_name
        }
      }

      return user;
    }
  }
}

const findAll = async () => {
  const users = await db('users as u')
  .join('roles as r', 'r.role_id', 'u.role_id')
  .select('u.user_id', 'u.username', 'u.password', 'r.role_id', 'r.role_name');
  
  return formatUsers(users);
};

const findById = async (user_id) => {
  const user = await db('users as u')
  .join('roles as r', 'r.role_id', 'u.role_id')
  .where({ user_id })
  .select('u.user_id', 'u.username', 'u.password', 'r.role_id', 'r.role_name')
  .first();

  return formatUsers(user);
};

const findByUsername = async (username) => {
  const user = await db('users as u')
    .join('roles as r', 'u.role_id', 'r.role_id')
    .select('u.user_id', 'u.username', 'u.password', 'r.role_id', 'r.role_name')
    .where({ username })
    .first();

  return formatUsers(user);
};

module.exports = {
  findAll,
  findById,
  findByUsername
};