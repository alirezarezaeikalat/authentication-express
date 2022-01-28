const express = require('express');
const middlewares = require('../middlewares');
const CrawlService = require('../../services/crawl.js');
const crawlService = new CrawlService();


const router = express.Router();
module.exports = (app) => {
  app.use('/crawl', router);

  // crawl the url
  router.get(
    '/',
    middlewares.isAuth,
    async (req, res, next) => {
      const url = req.query.url;
      try {
        const page = await crawlService.Crawl(url);
        const pageRecord = await crawlService.Save(page);
        res.status(201).json(pageRecord);
      } catch (e) {
        console.log('error:', e);
        return next(e);
      }
    },
  );
  router.post(
    '/',
    middlewares.isAuth,
    async (req, res, next) => {
      const { url, metaTags } = req.body;
      try {
        if (!url) {
          throw {status: 400, message: 'Url input is required!'}
        }
        page = {
          url,
          metaTags
        }
        const pageRecord = await crawlService.Save(page);
        res.status(201).json(pageRecord);
      } catch (e) {
        console.log('error:', e);
        return next(e);
      }
    },
  );
  router.post
};