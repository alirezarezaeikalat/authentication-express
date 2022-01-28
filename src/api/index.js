const express = require('express');
const auth = require('./routes/auth');
const crawl = require('./routes/crawl')

module.exports = () => {
	const app = express.Router();
	auth(app);
	crawl(app);
	return app;
}