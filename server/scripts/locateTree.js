function locateTree(node) {
	const X_OFFSET = 25;
	const Y_HEIGHT = 25;
	let furthestRight = 0;

	function locateTapRoot(node) {
		node.data_location = {
			x:
				node.data_cleanChildren.reduce((total, currChild) => {
					return total + currChild.data_location.x;
				}, 0) / node.data_cleanChildren.length,
			y: 0,
		};
	}

	// this function takes a node and adds correct location info to the non-text nodes
	function buildTree(node, level = 1, x = 0) {
		// this loops recursively through each node's children and adds 'location' object with x & y coordinates to each non-text, non-<script> node
		node.data_cleanChildren.forEach((child) => {
			buildTree(child, level + 1, x);
			child.data_location = {};

			child.data_location.y = level * Y_HEIGHT;

			// Horizontal location
			//   if node is a leaf (no children), then place it at either x or furthest right + X_OFFSET, then augment furthest right by X_OFFSET
			if (!child.data_cleanChildren.length) {
				child.data_location.x = Math.max(x, furthestRight);
				furthestRight = Math.max(x, furthestRight) + X_OFFSET;
				//  if node is not a leaf (has children), then place it at its children's average position
			} else {
				let childXAvg =
					child.data_cleanChildren.reduce((total, currChild) => {
						return total + currChild.data_location.x;
					}, 0) / child.data_cleanChildren.length;
				child.data_location.x = childXAvg;
			}
			x += X_OFFSET;
		});
	}

	buildTree(node, 1);
	locateTapRoot(node);

	return node;
}

module.exports = locateTree;
