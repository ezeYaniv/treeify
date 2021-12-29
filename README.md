# Treeify

## Introduction
This web app fetches any website's DOM and displays it in visual form - as a tree!

---

## Usage
Visit *** for a working demo of the app.

---

## Under the Hood
### Technologies Applied & Skills Learned
* Express backend (asynchronous logic, error handling)
* React frontend (form validation, POST request to server, UI gracefully handles loading & error states)
* Tree traversal algorithms to build the DOM object and draw the tree
* p5.js embedded in React through useRef & useEffect hooks

### Summary

### How It Works
1. User inputs a URL and clicks treeify
2. React app sends URL to Express server in a POST request
3. Server makes a GET request to the external site and fetches its DOM
4. Server parses the data with a tree traversal, adding drawing information to each node
5. React app receives data from the server
6. React app renders the tree on screen

### Known Issues & Bugs
Issues can be found in this repo's [Issues](url) tab.

### Biggest Challenge/Discussion Section

---

## Screenshots

---

## Links
