const express = require("express");

const accountsAPI = require('../api/accounts.js')

const server = express();
server.use(express.json());

server.use('/api/accounts/', accountsAPI)

server.get('/', (req, res) => {
        res.status(200).send('I am alive');
    })

module.exports = server;
