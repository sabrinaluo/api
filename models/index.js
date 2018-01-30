const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);

const dbConfig = require('../config/db-config');

const sequelize = new Sequelize(
  dbConfig[process.env.NODE_ENV || 'development']
);
console.log(sequelize)
const db = {};

// load model
fs
  .readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// test db connections
sequelize
  .authenticate()
  .then(() => {
    console.log('connection good');
  })
  .catch(e => {
    console.log('connection failed', e);
  });

module.exports = db;
