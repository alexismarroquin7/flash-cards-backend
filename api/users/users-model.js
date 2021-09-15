const db = require('../data/db-config');

const formatUsers = (rows) => {
  if(!rows){
    return rows;
  
  } else {
    if (Array.isArray(rows)){
      const users = rows.map(row => {
        return {
          id: row.user_id,
          username: row.username,
          role: {
            id: row.role_id,
            name: row.role_name
          }
        }
      });
  
      return users;
    
    } else {  
      const user = {
        id: rows.user_id,
        username: rows.username,
        role: {
          id: rows.role_id,
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
  .select('u.user_id', 'u.username', 'r.role_id', 'r.role_name');
  
  return formatUsers(users);
};

const findById = async (user_id) => {
  const user = await db('users as u')
  .join('roles as r', 'r.role_id', 'u.role_id')
  .where({ user_id })
  .select('u.user_id', 'u.username', 'r.role_id', 'r.role_name')
  .first();

  return formatUsers(user);
};

module.exports = {
  findAll,
  findById
};