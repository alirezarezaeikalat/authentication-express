const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');
const redisClient = require('./redis')

module.exports = async ({ expressApp }) => {
	

  const connection = await mongooseLoader();
	console.log('DB is loaded and connected');

	

  await expressLoader({ app: expressApp, redisClient });
	console.log('Express loaded')
};