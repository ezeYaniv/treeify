const jsdom = require('jsdom');
const axios = require('axios');
const { JSDOM } = jsdom;

// this function takes a user-input URL and returns that URL's DOM as an object
async function fetchDom(url) {
	try {
		const { data } = await axios.get(url);
		const { document } = new JSDOM(data).window;
		return document.body;
	} catch (err) {
		throw new Error('Error fetching DOM: ', err);
	}
}

module.exports = fetchDom;
