class ConfigurationService {
    static #configurations = {
        dhis2_url: '',
        dhis2_username: '',
        dhis2_password: ''
    }

    static setConfig({dhis2_url, dhis2_username, dhis2_password}){
        this.#configurations = {dhis2_url, dhis2_username, dhis2_password};
    }

    static getConfig(){
        return this.#configurations;
    }
}

module.exports = ConfigurationService;