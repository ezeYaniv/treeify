const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

const fetchDom = require('./scripts/fetchDom');
const extractData = require('./scripts/extractData');
const locateTree = require('./scripts/locateTree');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.post('/', async (req, res) => {
	const url = req.body.url;
	try {
		const domBody = await fetchDom(url);
		const extractedBody = extractData(domBody);
		const locatedTree = locateTree(extractedBody);
		res.send({ treeDom: locatedTree.node, canvasOffsets: locatedTree.canvasOffsets });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log('App listening at port:', port);
});
