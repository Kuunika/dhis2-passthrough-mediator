import * as express from "express";
import * as cors from "cors";
import * as axios from "axios";
import Helmet from "helmet";
import {registerToOpenHim} from "./openhim";
import {ConfigurationService} from "./common/services";
const https = require("https");
require("dotenv").config();

const MEDIATOR_PORT = process.env.MEDIATOR_PORT;

const app = express();

app.use(cors());
app.use(Helmet());

app.all("*", async (req, res) => {
	const requestUrl = req.url.split("/dhis2")[1];
	if (requestUrl === "/" || requestUrl === "") {
		return res.status(200).json({
			message: "Hello and Welcome to the DHIS2 Pass Through Mediator Service",
		});
	}

	const {dhis2_password, dhis2_url, dhis2_username} =
		ConfigurationService.getConfig();

	try {
		const httpsAgent = new https.Agent({
			rejectUnauthorized: false,
			requestCert: false,
			agent: false,
		});
		const request = await axios.default.request({
			auth: {
				username: dhis2_username,
				password: dhis2_password,
			},
			url: dhis2_url + requestUrl,
			method: req.method as axios.Method,
			data: req?.body,
			httpsAgent,
		});

		return res.status(request.status).json(request.data);
	} catch (error) {
		return res.status(error.response.status).json(error.response.data);
	}
});

app.listen(MEDIATOR_PORT, () => {
	console.log(`Mediator is live - Now Listening on Port:${MEDIATOR_PORT}`);
});

registerToOpenHim();
