# 🌳 Treeify 🌳

## Introduction

This web app fetches any website's DOM and displays it in visual form - as a tree!

---

## Usage

### Demo

Visit https://treeify-app.herokuapp.com/ for a working demo of the app.
Some suggestions for good-looking URLs:

- https://google.com
- https://www.tomatotimers.com/
- https://www.simplehtmlguide.com/basics.php

Warning: if a website has too large of a DOM, tree rendering may slow down significantly, or it may try to render on a canvas larger than your browser will allow. If this happens, reload the tab (or close and reopen) and try again with a different URL.

### Run Locally

1. Clone or download the code into a directory of your choosing
2. In the project's root directory, run `yarn start` to start the Express server and verify CLI prints `App listening at port: 3001`
3. In the project's client directory (`cd client`), run `yarn start` to start the React app

---

## Under the Hood

### How It Works

1. User inputs a URL and clicks treeify
2. React app sends URL to Express server in a POST request
3. Server makes a GET request to the external site and fetches its DOM
4. Server parses the data with a tree traversal, adding drawing information to each node
5. React app receives data from the server
6. React app renders the tree on screen

### Technologies Applied & Skills Learned

- Express backend (asynchronous logic, error handling)
- React frontend (form validation, POST request to server, UI gracefully handles loading & error states)
- Depth-first and breadth-first tree traversal algorithms to build the DOM object and draw the tree
- p5.js embedded in React through useRef & useEffect hooks

### Known Issues & Bugs

Issues can be found in this repo's [Issues](url) tab.

### Challenge/Discussion Section

Drawing a balanced, good-looking tree is harder than it sounds. Credit to [Bill Mill](https://github.com/llimllib) for [this extensive article](https://llimllib.github.io/pymag-trees/) discussing methods and key principles.

Tl;dr:

**Principle 1**: _The edges of the tree should not cross each other._

**Principle 2**: _All nodes at the same depth should be drawn on the same horizontal line. This helps make clear the structure of the tree._

**Principle 3**: _Trees should be drawn as narrowly as possible._

**Principle 4**: _A parent should be centered over its children._

---

## Screenshots

## ![treeify screenshot]("https://github.com/ezeYaniv/treeify/blob/main/extras/screenshots/Treeify_screenshot.JPG")
