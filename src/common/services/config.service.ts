import {IAppConfiguration} from "../interfaces/app-configuration";

export class ConfigurationService {
	private static configurations: IAppConfiguration = {
		dhis2_url: "",
		dhis2_username: "",
		dhis2_password: "",
	};

	static setConfig(appConfig: IAppConfiguration) {
		this.configurations = {...appConfig};
	}

	static getConfig() {
		return this.configurations;
	}
}
