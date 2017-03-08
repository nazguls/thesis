const Sequelize = require('sequelize');
const connection = require('./dbConnect');

const Spy = connection.define('Spy', {
  timestamp: Sequelize.DATE,
  tradingDay: Sequelize.DATE,
  open: Sequelize.FLOAT,
  high: Sequelize.FLOAT,
  low: Sequelize.FLOAT,
  close: Sequelize.FLOAT,
  volume: Sequelize.FLOAT,
  openInterest: Sequelize.FLOAT
});

module.exports = Spy; 
