const mongoose = require('mongoose');

const metaTagSchema = new mongoose.Schema(
	{
		attributes: [{
			key: String,
			value: String
		}]
	},
	{ _id: false });

const PageSchema = new mongoose.Schema(
	{
		url: {
			type: String,
			required: true,
			index: true,
			unique: true,
		},
		metaTags: [metaTagSchema]
	},
	{ timestamps: true },
);

const Page = mongoose.model('Page', PageSchema);

module.exports = Page;