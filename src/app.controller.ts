import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { DHIS2Service } from './dhis2/dhis2.service';

@Controller()
export class AppController {
	constructor(private readonly dhis2Service: DHIS2Service) { }

	@Get(`*`)
	async catchAllGet(@Req() request: Request) {
		return this.dhis2Service.requestServiceFromDHIS2('GET', request.url);
	}

	@Post(`*`)
	async catchAllPost(@Req() request: Request) {
		return this.dhis2Service.requestServiceFromDHIS2(
			'POST',
			request.url,
			request.body,
		);
	}
}
