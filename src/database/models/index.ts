'use strict';
import * as fs from 'fs';
import * as path from 'path';
import {DataTypes, Sequelize} from 'sequelize';
const basename = path.basename(__filename);
const db: any = {};

let sequelize = new Sequelize(process.env.DB_HOSTNAME, process.env.DB_USERNAME,  process.env.DB_PASSWORD, {});

fs
  .readdirSync(__dirname)
  .filter(file => {
    console.log(file);
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-8) === 'model.ts');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
