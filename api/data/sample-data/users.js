const bcrypt = require('bcryptjs');

const rounds = process.env.DB_ROUNDS || 8;

const userPassword = process.env.SEED_USER_PASSWORD || '1234';
const adminPassword = process.env.SEED_ADMIN_PASSWORD || '1234';

const userHash = bcrypt.hashSync(userPassword, rounds);
const adminHash = bcrypt.hashSync(adminPassword, rounds);

const users = [
  { // 1
    username: 'testadmin',
    password: adminHash,
    role_id: 1 // admin
  },
  { // 2
    username: 'testadmin1',
    password: adminHash,
    role_id: 1 // admin
  },
  { // 3
    username: 'testadmin2',
    password: adminHash,
    role_id: 1 // admin
  },
  { // 4
    username: 'testuser',
    password: userHash,
    role_id: 2 // user
  },
  { // 5
    username: 'testuser1',
    password: userHash,
    role_id: 2 // user
  },
  { // 6
    username: 'testuser2',
    password: userHash,
    role_id: 2 // user
  },
];

module.exports = {
  users
};