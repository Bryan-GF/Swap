require('dotenv').config()
const Chatkit = require('@pusher/chatkit-server');
const express = require('express');
const port = process.env.PORT || 9000;
const cors = require('cors');
const server = express();


server.use(express.json())
server.use(cors());

server.listen(port, function() {
    console.log(`\n=== Web API Listening on port ${port} ===\n`);
});
