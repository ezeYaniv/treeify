// this function adds data_ properties to each HTML element node: innerText, nodeName, className, id, cleanChildren
function extractData(node) {
	function cleaningHelper(node) {
		if (node.childNodes.length === 1 && node.childNodes[0].nodeName === '#text') {
			node.data_innerText = node.childNodes[0].textContent;
		} else {
			node.data_innerText = null;
		}

		node.data_nodeName = node.nodeName.toLowerCase();

		node.data_classNames = node.classList ? node.classList.value.toString().match(/\S+/g) : [];

		node.data_id = node.id;

		node.data_cleanChildren = Array.from(node.childNodes).filter(
			(child) => child.nodeType === 1 && child.nodeName !== 'SCRIPT'
		);

		// recursion
		node.data_cleanChildren.forEach((cleanChild) => {
			extractData(cleanChild);
		});
	}
	cleaningHelper(node);
	return node;
}

module.exports = extractData;
