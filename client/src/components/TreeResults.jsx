import React, { useEffect, useRef } from 'react';
import Sketch from 'react-p5';
import '../styles/TreeResults.css';
import { sizeCanvas } from '../scripts/sizeCanvas';

const TreeResults = ({ treeDom, canvasOffsets }) => {
	const scrollRef = useRef(null);
	// console.log(treeDom, canvasOffsets, document.documentElement.clientWidth);
	const framesPerLevel = 60;
	const canvasSize = sizeCanvas(treeDom);
	// call a locate tree function that takes the document.documentElement.clientWidth - this needs to be used to add to each node's location: location + (clientWidth - furthestRight)/2
	let setup = (p5, parentRef) => {
		p5.createCanvas(canvasSize.x + canvasOffsets.x, canvasSize.y + canvasOffsets.y + 100).parent(
			// added 100 to height to offset tooltip height
			// document.getElementById('scrollContainer')
			parentRef
		);

		let idCount = 0;
		function drawNodes(node) {
			let remainingNodes = [node];
			while (remainingNodes.length) {
				let currNode = remainingNodes.shift();
				remainingNodes.push(...currNode.data_cleanChildren);

				let bubble = p5
					.createElement('div', currNode.data_nodeName)
					.parent(parentRef)
					.id(idCount)
					.class('leaf__container');
				bubble.position(currNode.data_location.x, currNode.data_location.y);
				bubble.elt.style.zIndex = 10000000 - idCount; // z-index to allow tooltips to overlay the siblings
				let tooltip = p5.createElement('div').parent(bubble).class('leaf__tooltip');
				tooltip.html(`
		      <p style="margin-bottom: 0.5rem"><strong>Element Info</strong></p>
		      <p><strong>inner text</strong>: ${
						currNode.data_innerText ? currNode.data_innerText : '<em>none</em>'
					}</p>
		      <p><strong>id</strong>: ${currNode.data_id ? currNode.data_id : '<em>none</em>'}</p>
		      <p><strong>classes</strong>: ${
						currNode.data_classNames ? currNode.data_classNames : '<em>none</em>'
					}</p>
		    `);
				idCount++;
			}
		}
		drawNodes(treeDom);
	};

	let draw = (p5) => {
		let idCount = 0;
		function drawBranches(node, level) {
			document.getElementById(idCount).classList.add('visible');
			idCount++;
			let startFrame = framesPerLevel * level;
			let endFrame = startFrame + framesPerLevel;
			let origin = node.data_location;
			let n = p5.map(p5.frameCount, startFrame, endFrame, 0, 1, true);

			node.data_cleanChildren.forEach((child) => {
				let dest = child.data_location;
				let drawX = p5.lerp(origin.x, dest.x, n);
				let drawY = p5.lerp(origin.y, dest.y, n);
				p5.push();
				p5.strokeWeight(32 / (level + 1));
				p5.line(origin.x, origin.y, drawX, drawY);
				p5.pop();

				if (p5.frameCount > endFrame) {
					drawBranches(child, level + 1);
				}
			});
		}

		p5.clear();
		p5.push();
		p5.stroke('#864b29');
		drawBranches(treeDom, 0);
		p5.pop();
	};

	useEffect(() => {
		const treeCont = document.getElementById('scrollContainer');
		treeCont.scrollLeft = (treeCont.scrollWidth - window.innerWidth - 180) / 2; // Note: 180 is to balance tooltip width added to right side
		scrollRef.current.scrollIntoView({ behavior: 'smooth' });
		if (canvasSize.x < window.innerWidth) treeCont.classList.add('narrow');
	}, []);

	return (
		<div className="results__wrapper" ref={scrollRef}>
			<div id="scrollContainer" className="sketch__container">
				<Sketch
					setup={setup}
					draw={draw}
					style={{
						position: 'relative',
						// width:
						// 	canvasSize.x > document.documentElement.clientWidth
						// 		? ''
						// 		: document.documentElement.clientWidth,
						// display: 'flex',
						// justifyContent: 'center',
					}}
				/>
			</div>
		</div>
	);
};

export default TreeResults;
