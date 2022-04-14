const http = require('http');
const app = require('./app');

const memeRoutes = require('./api/meme/memes')

// Allows for deployment on servers with env var ports
const port = process.env.PORT || 3000;

const server = http.createServer(app)

server.listen(port);

console.log('listening on port:', port)