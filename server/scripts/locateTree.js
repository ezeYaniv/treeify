function locateTree(node) {
	const X_OFFSET = 75;
	const Y_HEIGHT = 100;
	let furthestRight = 0;
	let totalHeight = 0;

	function locateTapRoot(node) {
		node.data_location = {
			x: furthestRight/2, 
				// node.data_cleanChildren.reduce((total, currChild) => {
				// 	return total + currChild.data_location.x;
				// }, 0) / node.data_cleanChildren.length,
			y: Y_HEIGHT,
		};
	}

	// this function takes a node and adds correct location info to the non-text nodes
	function buildTree(node, level = 1, x = X_OFFSET) {
		// this loops recursively through each node's children and adds 'location' object with x & y coordinates to each non-text, non-<script> node
		node.data_cleanChildren.forEach((child) => {
			buildTree(child, level + 1, x);
			child.data_location = {};

			child.data_location.y = (level + 1) * Y_HEIGHT;

			// Horizontal location
			//   if node is a leaf (no children), then place it at either x or furthest right + X_OFFSET, then augment furthest right by X_OFFSET
			if (!child.data_cleanChildren.length) {
				child.data_location.x = Math.max(x, furthestRight);
				furthestRight = Math.max(x, furthestRight) + X_OFFSET;
				totalHeight = Math.max(totalHeight, child.data_location.y);
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

	return { node: node, canvasOffsets: { x: X_OFFSET, y: Y_HEIGHT } };
}

module.exports = locateTree;
