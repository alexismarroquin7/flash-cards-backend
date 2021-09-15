const bcrypt = require('bcryptjs');

const rounds = process.env.DB_ROUNDS || 8;

const userPassword = process.env.SEED_USER_PASSWORD || '1234';
const adminPassword = process.env.SEED_ADMIN_PASSWORD || '1234';

const userHash = bcrypt.hashSync(userPassword, rounds);
const adminHash = bcrypt.hashSync(adminPassword, rounds);

const users = [
  {
    username: 'testadmin',
    password: adminHash,
    role_id: 1 // admin
  },
  {
    username: 'testadmin1',
    password: adminHash,
    role_id: 1 // admin
  },
  {
    username: 'testadmin2',
    password: adminHash,
    role_id: 1 // admin
  },
  {
    username: 'testuser',
    password: userHash,
    role_id: 2 // user
  },
  {
    username: 'testuser1',
    password: userHash,
    role_id: 2 // user
  },
  {
    username: 'testuser2',
    password: userHash,
    role_id: 2 // user
  },
];

module.exports = {
  users
};