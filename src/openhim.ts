import {
	registerMediator,
	activateHeartbeat,
	fetchConfig,
	OpenHIMVariables,
	MediatorConfiguration,
} from "openhim-mediator-utils";
import {readJsonFile} from "./common/utilities";
import {ConfigurationService} from "./common/services/config.service";
import {config} from "dotenv";
import { join } from "path";
config();

const username = process.env.OPENHIM_USERNAME;
const password = process.env.OPENHIM_PASSWORD;
const apiURL = process.env.OPENHIM_API_URL;

async function getConfigurations() {
	const mediatorConfig = await readJsonFile<MediatorConfiguration>(
		join(__dirname, "config", "mediatorConfig.json")
	);

	const openhimConfig = {
		username,
		password,
		apiURL,
		trustSelfSigned: true,
		urn: mediatorConfig.urn,
	};

	return {
		mediatorConfig,
		openhimConfig,
	};
}

export async function registerToOpenHim() {
	const {mediatorConfig, openhimConfig} = await getConfigurations();

	registerMediator(openhimConfig, mediatorConfig, (err: Error) => {
		if (err) {
			console.log(
				`There was an issue registering the mediator, please check the mediator config file`,
				err
			);
			process.exit(1);
		}

		fetchConfig(openhimConfig, (err: Error, initialConfig) => {
			if (err) {
				console.error(`Failed to Fetch Configurations: ${err}`);
				process.exit(1);
			}
			if (Object.keys(initialConfig).length > 0) {
				ConfigurationService.setConfig({...initialConfig.DHIS2});
				return;
			}

			console.info(
				"Initial Configuration Parameters Not Set, Please Update in Mediator Console"
			);
		});

		const openhimEmitter = activateHeartbeat(openhimConfig, 30000);

		openhimEmitter.on("error", (err) =>
			console.error(`The heartbeat failed ${err}`)
		);

		openhimEmitter.on("config", (arg) => {
			const config = arg as OpenHIMVariables;
			console.log("New configurations received");
			ConfigurationService.setConfig({...config.DHIS2});
		});
	});
}
