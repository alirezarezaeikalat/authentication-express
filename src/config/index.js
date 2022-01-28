const dotenv = require('dotenv');
const secrets = require('./secrets');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
console.log(envFound)
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  env: process.env.NODE_ENV,

  port: parseInt(process.env.PORT, 10),

  databaseURL: process.env.MONGODB_URI,

  sessionSecret: secrets.sessionSecret,

  api: {
    prefix: '/api',
  },

};