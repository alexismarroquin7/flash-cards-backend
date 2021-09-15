const db = require('../data/db-config');

module.exports = {
  findAll: async () => {
    const roles = await db('roles');
    return roles;
  }
}