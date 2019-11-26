var Sequelize = require('sequelize');

var DB_NAME = process.env['DB_NAME'];
var DB_USER = process.env['DB_USER'];
var DB_PW = process.env['DB_PW'];
var DB_SERVER = process.env['DB_SERVER'];
var DB_HOST = process.env['DB_HOST'];
var DB_PORT = +process.env['DB_PORT'] || 1433;
var sequelize = new Sequelize(DB_NAME, DB_USER, DB_PW, {
  host: DB_HOST,
  dialect: DB_SERVER,
  port: DB_PORT,
  operatorsAliases: false,
  define: {
    timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;
