export function sizeCanvas(node) {
	let totalHeight = 0;
	let totalWidth = 0;

	function traverseTree(node) {
		totalWidth = Math.max(node.data_location.x, totalWidth);
		totalHeight = Math.max(node.data_location.y, totalHeight);

		node.data_cleanChildren.forEach((child) => {
			traverseTree(child);
		});
	}

	traverseTree(node);

	return { x: totalWidth, y: totalHeight };
}
