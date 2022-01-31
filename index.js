const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { registerMediator } = require('openhim-mediator-utils');
require('dotenv').config();

const MEDIATOR_PORT = process.env.MEDIATOR_PORT;

const app = express();

app.use(cors());

app.all('*', (req, res) => {

});


app.listen(MEDIATOR_PORT,() => {
    console.log(`Mediator is live - Now Listening on Port:${MEDIATOR_PORT}`);
});