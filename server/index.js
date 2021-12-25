const express = require('express');
const fetchDom = require('./scripts/fetchDom');
const app = express();
const bodyParser = require('body-parser');
const extractData = require('./scripts/extractData');
const locateTree = require('./scripts/locateTree');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', async (req, res) => {
	const url = req.body.url;
	try {
		const domBody = await fetchDom(url);
		const extractedBody = extractData(domBody);
		const locatedTree = locateTree(extractedBody);
		res.send({ treeDom: locatedTree });
	} catch (err) {
		res.status(500).send({ error: new Error(err) });
	}
});

const port = 3001;
app.listen(port, () => {
	console.log('App listening at port:', port);
});
