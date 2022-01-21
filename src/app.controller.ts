import { Controller, Get, Header, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { DHIS2Service } from './dhis2/dhis2.service';

@Controller()
export class AppController {
  constructor(private readonly dhis2Service: DHIS2Service) {}

  @Get(`*`)
  @Header('Access-Control-Allow-Origin', ' *')
  @Header(
    'Access-Control-Allow-Methods',
    ' GET, POST, PATCH, PUT, DELETE, OPTIONS',
  )
  @Header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')
  async catchAllGet(@Req() request: Request, @Res() response: Response) {
    const res = await this.dhis2Service.requestServiceFromDHIS2(
      'GET',
      request.url,
    );
    return response.json(res);
  }

  @Post(`*`)
  @Header(
    'Access-Control-Allow-Methods',
    ' GET, POST, PATCH, PUT, DELETE, OPTIONS',
  )
  @Header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')
  async catchAllPost(@Req() request: Request, @Res() response: Response) {
    const res = await this.dhis2Service.requestServiceFromDHIS2(
      'POST',
      request.url,
      request.body,
    );

    return response.json(res);
  }
}
