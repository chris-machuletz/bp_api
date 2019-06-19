const app = require('./app');
const http = require('http');

console.log("Server listening on port " + process.env.PORT);
http.createServer(app).listen(process.env.PORT);
