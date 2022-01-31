const express = require('express');
const cors = require('cors');
const axios = require('axios');
const helmet = require('helmet');
const mediatorConfig = require('./mediatorConfig.json');
const { registerMediator, activateHeartbeat, fetchConfig } = require('openhim-mediator-utils');
require('dotenv').config();

const MEDIATOR_PORT = process.env.MEDIATOR_PORT;
const username = process.env.OPENHIM_USERNAME;
const password = process.env.OPENHIM_PASSWORD;
const apiURL = process.env.OPENHIM_API_URL;

let dhis2_url = '';
let dhis2_username = '';
let dhis2_password = '';

const app = express();

app.use(cors());
app.use(helmet());

app.all('*', (req, res) => {
    console.log('Im hit');
    console.log(req.url);
    return res.json({
        message: 'Hello World'
    });
});

const openhimConfig = {
    username,
    password,
    apiURL,
    trustSelfSigned: true,
    urn: mediatorConfig.urn
}

app.listen(MEDIATOR_PORT,() => {
    console.log(`Mediator is live - Now Listening on Port:${MEDIATOR_PORT}`);
});

registerMediator(openhimConfig, mediatorConfig, err =>{
    if (err) {
        console.log(`There was an issue registering the mediator, please check the mediator config file`, err);
        process.exit(1)
    }

    fetchConfig(openhimConfig, (err, initialConfig)=>{
        if(err){
            console.error(`Failed to Fetch Configurations: ${err}`);
            process.exit(1);
        }
        if(Object.keys(initialConfig).length > 0){
            dhis2_url = initialConfig.dhis2_url;
            dhis2_username = initialConfig.username;
            dhis2_password = initialConfig.password;
        }else{
            console.info('Initial Configuration Parameters Not Set, Please Update in Mediator Console');
        }
        
    });

    const openhimEmitter  = activateHeartbeat(openhimConfig, 30000);
    
    openhimEmitter.on('error', err => console.error(`The heartbeat failed ${err}`));

    openhimEmitter.on('config', config => {
        dhis2_url = config.dhis2_url;
        dhis2_username = config.username;
        dhis2_password = config.password;
    });
});

