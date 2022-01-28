const axios = require('axios');
const cheerio = require('cheerio');
const Page = require('../models/page');

class CrawlService {
	async Crawl(url) {
		try {
			const response = await axios.get(url);
			if (response.status === 200) {
				const html = response.data;
				const $ = cheerio.load(html);
				const page = {
					url: url,
					metaTags: []
				};
				$('meta').each(function (i, e) {
					const attributes = $(this).attr();
					const newAttributes = [];
					Object.keys(attributes).forEach(function (key) {
						newAttributes.push({
							key: key,
							value: attributes[key]
						});
					});
					page.metaTags.push({
						attributes: newAttributes
					})
				});
				return page;
			} else {
				throw Error('Faild to load the url')
			}
		} catch (e) {
			console.log(e);
			throw e;
		}
	}

	async Save(page) {
		try {
			const pageRecord = await Page.findOne({ url: page.url })
			// New url
			if (!pageRecord) {
				const newPage = await Page.create(page);
				if (!newPage) {
					throw Error('User creation error');
				}
				return newPage;
			// Old url
			} else {
				const filter = { url: page.url };
				const update = { metaTags: page.metaTags }
				const newPage = await Page.findOneAndUpdate(filter, update);
				return newPage;
			}
		} catch (e) {
			console.log(e);
			throw e;
		}
	}
}

module.exports = CrawlService