import React, { useEffect, useRef } from 'react';
import Sketch from 'react-p5';
import '../styles/TreeResults.css';
import { sizeCanvas } from '../scripts/sizeCanvas';

const TreeResults = ({ treeDom, canvasOffsets }) => {
	const scrollRef = useRef(null);
	const framesPerLevel = 60;
	const canvasSize = sizeCanvas(treeDom);

	useEffect(() => {
		let zoom = 1;
		const scrollC = document.getElementById('scroll__container');
		const p5Sketch = document.querySelector("[data-testid='react-p5']");
		const canvasC = document.getElementById('defaultCanvas0');
		const initCanvas = { width: canvasC.clientWidth, height: canvasC.clientHeight };
		const initScroll = { width: scrollC.clientWidth, height: scrollC.clientHeight };
		const initSketch = { width: p5Sketch.clientWidth, height: p5Sketch.clientHeight };

		// ~~~~~~~~~ BEHAVIOR ONCE COMPONENT IS MOUNTED ~~~~~~~~~~~
		p5Sketch.style.height = `${initCanvas.height}px`;
		scrollC.style.height = `${initScroll}px`;

		scrollC.scrollLeft = (scrollC.scrollWidth - window.innerWidth - 180) / 2; // Note: 180 is to balance tooltip width added to right side

		scrollRef.current.scrollIntoView({ behavior: 'smooth' });

		if (canvasSize.x < window.innerWidth) scrollC.classList.add('narrow');

		// ~~~~~~~~~~~ ZOOM IN/ZOOM OUT BUTTONS ~~~~~~~~~~~~~~~~
		function updateZoom(zoom) {
			p5Sketch.style.transform = `scale(${zoom})`;
			scrollC.style.height = `${initScroll.height * zoom + 25}px`;
			if (zoom < 1) {
				p5Sketch.style.height = `${initSketch.height * zoom}px`;
			}
			console.log(
				zoom,
				initCanvas,
				initScroll,
				initSketch,
				'canvas',
				canvasC.offsetHeight,
				'sketch',
				p5Sketch.offsetHeight,
				p5Sketch.clientHeight,
				p5Sketch.style.height,
				'container',
				scrollC.offsetHeight,
				scrollC.clientHeight,
				scrollC.style.height,
				scrollC.clientHeight / p5Sketch.clientHeight
			);
		}

		document.getElementById('plus').addEventListener('click', () => {
			zoom += 0.1;
			updateZoom(zoom);
		});

		document.getElementById('minus').addEventListener('click', () => {
			if (zoom > 0.2) zoom -= 0.1;
			updateZoom(zoom);
		});

		console.log(
			zoom,
			initCanvas,
			initScroll,
			initSketch,
			'canvas',
			canvasC.offsetHeight,
			'sketch',
			p5Sketch.offsetHeight,
			p5Sketch.clientHeight,
			p5Sketch.style.height,
			'container',
			scrollC.offsetHeight,
			scrollC.clientHeight,
			scrollC.style.height,
			scrollC.clientHeight / p5Sketch.clientHeight
		);
	}, [canvasSize.x]);

	// call a locate tree function that takes the document.documentElement.clientWidth - this needs to be used to add to each node's location: location + (clientWidth - furthestRight)/2
	let setup = (p5, parentRef) => {
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
				bubble.elt.style.zIndex = 10000 - idCount; // z-index to allow tooltips to overlay the siblings
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

		let idCount = 0;
		p5.createCanvas(canvasSize.x + canvasOffsets.x, canvasSize.y + canvasOffsets.y + 100).parent(
			// added 100 to height to offset tooltip height
			parentRef
		);
		drawNodes(treeDom);
	};

	let draw = (p5) => {
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

		let idCount = 0;
		p5.clear();
		p5.push();
		p5.stroke('#864b29');
		drawBranches(treeDom, 0);
		p5.pop();
	};

	return (
		<div id="results__wrapper" className="results__wrapper" ref={scrollRef}>
			<div className="zoom__wrapper">
				<input type="button" id="plus" value="+" className="zoom__button" />
				<input type="button" id="minus" value="-" className="zoom__button" />
			</div>
			<div id="scroll__container" className="scroll__container">
				<Sketch setup={setup} draw={draw} />
			</div>
		</div>
	);
};

export default TreeResults;
