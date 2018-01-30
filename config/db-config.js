const fs = require('fs');
require('./env');

// below structure is required by sequelize, this file will be used by *sequelize-cli
const options = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOSTNAME,
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