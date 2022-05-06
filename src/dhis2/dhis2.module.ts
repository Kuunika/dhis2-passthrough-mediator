import { Module } from '@nestjs/common';
import { DHIS2Service } from './dhis2.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpConfigService } from '../configuration/http-config.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useClass: HttpConfigService,
    }),
  ],
  providers: [DHIS2Service],
  exports: [DHIS2Service],
})
export class Dhis2Module {}
