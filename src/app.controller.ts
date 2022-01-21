import { Controller, Get, Header, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { DHIS2Service } from './dhis2/dhis2.service';

@Controller()
export class AppController {
  constructor(private readonly dhis2Service: DHIS2Service) {}

  @Get(`*`)
  /*@Header(
    'Content-Security-Policy',
    "default-src 'self' 'unsafe-inline' *.health.gov.mw",
  )*/
  async catchAllGet(@Req() request: Request, @Res() response: Response) {
    const res = await this.dhis2Service.requestServiceFromDHIS2(
      'GET',
      request.url,
    );
    return response.json(res);
  }

  @Post(`*`)
  /*@Header(
    'Content-Security-Policy',
    "default-src 'self' 'unsafe-inline' *.health.gov.mw",
  )*/
  async catchAllPost(@Req() request: Request, @Res() response: Response) {
    const res = await this.dhis2Service.requestServiceFromDHIS2(
      'POST',
      request.url,
      request.body,
    );

    return response.json(res);
  }
}
