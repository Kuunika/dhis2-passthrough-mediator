declare module "openhim-mediator-utils" {
	export interface MediatorConfiguration {
		urn: string;
		version: string;
		name: string;
		description: string;
		defaultChannelConfig: DefaultChannelConfig[];
		endpoints: Endpoint[];
		configDefs: ConfigDef[];
	}

	export interface ConfigDef {
		param: string;
		displayName: string;
		description: string;
		type: string;
		array: boolean;
		template: Template[];
	}

	export interface Template {
		param: string;
		displayName: string;
		description: string;
		type: string;
	}

	export interface DefaultChannelConfig {
		name: string;
		urlPattern: string;
		routes: Endpoint[];
		allow: string[];
		methods: string[];
		type: string;
	}

	export interface Endpoint {
		name: string;
		host: string;
		path: string;
		port: string;
		primary: boolean;
		type: string;
	}

	export interface OpenhimConfiguration {
		username: string;
		password: string;
		apiURL: string;
		trustSelfSigned: boolean;
		urn: string;
	}

	export interface OpenHIMVariables {
		DHIS2: {
			dhis2_username: string;
			dhis2_password: string;
			dhis2_url: string;
		};
	}
	//TODO: Come up with better naming for the types
	export type Callback = (arg: Error | OpenHIMVariables) => void;
	type FetchConfigCallBack = (err: Error, initialConfig: OpenHIMVariables) => void;

	export function registerMediator(
		openhimConfig: OpenhimConfiguration,
		mediatorConfig: MediatorConfiguration,
		callback: Callback
	): void;

	export function activateHeartbeat(
		openhimConfig: OpenhimConfiguration,
		interval: number
	): {
		on: (eventName: string, callback: Callback) => void;
	};

	export function fetchConfig(
		openhimConfig: OpenhimConfiguration,
		callback: FetchConfigCallBack
	): void;
}
