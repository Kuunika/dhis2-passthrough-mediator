declare module "openhim-mediator-utils" {
	export interface IMediatorConfiguration {
		urn: string;
		version: string;
		name: string;
		description: string;
		defaultChannelConfig: IDefaultChannelConfig[];
		endpoints: IEndpoint[];
		configDefs: IConfigDef[];
	}

	export interface IConfigDef {
		param: string;
		displayName: string;
		description: string;
		type: string;
		array: boolean;
		template: ITemplate[];
	}

	export interface ITemplate {
		param: string;
		displayName: string;
		description: string;
		type: string;
	}

	export interface IDefaultChannelConfig {
		name: string;
		urlPattern: string;
		routes: IEndpoint[];
		allow: string[];
		methods: string[];
		type: string;
	}

	export interface IEndpoint {
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
		mediatorConfig: IMediatorConfiguration,
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
