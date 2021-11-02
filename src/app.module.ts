import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Dhis2Module } from './dhis2/dhis2.module';

@Module({
  imports: [ConfigModule.forRoot(), Dhis2Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
