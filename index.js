const express = require('express');
const cors = require('cors');
const axios = require('axios');
const helmet = require('helmet');
const { registerMediator } = require('./openhim');
const ConfigService = require('./common/services/config.service');
require('dotenv').config();

const MEDIATOR_PORT = process.env.MEDIATOR_PORT;

const app = express();

app.use(cors());
app.use(helmet());

app.all('*', async (req, res) => {
    if(req.url === '/'){
        return res.status(200).json({
            message: 'Hello and Welcome to the DHIS2 Pass Through Mediator Service'
        });
    }
    
    const { dhis2_password, dhis2_url, dhis2_username } = ConfigService.getConfig();

    try {
        const request = await axios.default.request({
            auth: {
                username: dhis2_username,
                password: dhis2_password,
            },
            url: dhis2_url + req.url,
            method: req.method,
            data: req?.body,
        });

        return res.status(request.status).json(request.data);
        
    } catch (error) {
        return res.status(error.response.status).json(error.response.data);
    }
});

app.listen(MEDIATOR_PORT,() => {
    console.log(`Mediator is live - Now Listening on Port:${MEDIATOR_PORT}`);
});

registerMediator();
