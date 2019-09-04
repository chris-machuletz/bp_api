const app = require('./app');
const http = require('http');
const port = 3000;

// Running on server?
console.log("Server listening on port " + port);
http.createServer(app).listen(port);
