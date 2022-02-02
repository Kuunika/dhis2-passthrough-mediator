const mediatorConfig = require('./mediatorConfig.json');
const { registerMediator, activateHeartbeat, fetchConfig } = require('openhim-mediator-utils');
const ConfigService = require('./common/services/config.service');
require('dotenv').config();

const username = process.env.OPENHIM_USERNAME;
const password = process.env.OPENHIM_PASSWORD;
const apiURL = process.env.OPENHIM_API_URL;

const openhimConfig = {
    username,
    password,
    apiURL,
    trustSelfSigned: true,
    urn: mediatorConfig.urn
}

registerMediator(openhimConfig, mediatorConfig, err =>{

    if (err) {
        console.log(`There was an issue registering the mediator, please check the mediator config file`, err);
        process.exit(1)
    }

    fetchConfig(openhimConfig, (err, initialConfig) => {
        console.log(initialConfig);
        if(err){
            console.error(`Failed to Fetch Configurations: ${err}`);
            process.exit(1);
        }
        if(Object.keys(initialConfig).length > 0){
            ConfigService.setConfig({...initialConfig.DHIS2});
            return;
        }
        
        console.info('Initial Configuration Parameters Not Set, Please Update in Mediator Console');
        
    });

    const openhimEmitter  = activateHeartbeat(openhimConfig, 30000);
    
    openhimEmitter.on('error', err => console.error(`The heartbeat failed ${err}`));

    openhimEmitter.on('config', config => {
        console.log(initialConfig);
        console.log('New configurations received');
        ConfigService.setConfig({...config.DHIS2});
    });
});

module.exports = {
    registerMediator
}