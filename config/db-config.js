const fs = require('fs');
require('./env');

// below structure is required by sequelize, this file will be used by *sequelize-cli
const options = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'postgres'
}

module.exports = {
  development: options,
  test: options,
  production: Object.assign({
    dialectOptions: {
      ssl: true
    }
  }, options)
};