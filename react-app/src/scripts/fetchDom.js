// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

// import axios from 'axios';

// const { JSDOM } = jsdom;

// this function takes a user-input URL and returns that URL's DOM as an object
async function fetchDom(url) {
	fetch(url)
  .then(res => res.text())
  .then((responseText) => {
    const doc = new DOMParser().parseFromString(responseText, 'text/html');
    const h1 = doc.querySelector('h1');
    console.log(h1.textContent);
  });
	// 	try {
// 		const { data } = await axios.get(url);
// 		const { document } = new JSDOM(data).window;
// 		return document.body;
// 	} catch (e) {
// 		console.error(`Error fetching dom: ${e}`);
// 	}
}

export default fetchDom;
