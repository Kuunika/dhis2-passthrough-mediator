import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import { AxiosError } from 'axios';
import { API_GLOBAL_BASE_URL } from './common/constants/environment';

@Controller()
export class AppController {
  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
  ) { }

  @Get(`*`)
  async catchAllGet(@Req() request: Request, @Res() response) {
    const path = request.url.split(
      this.config.get<string>(API_GLOBAL_BASE_URL),
    )[1];
    console.log(path);
    let values;
    try {
      values = await this.httpService.get(path).toPromise();
      return response.json(values.data);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return response.status(error.response.status).json(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        return response.json(error.request);
      }
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      return response.json(error.message);
    }
  }

  @Post(`*`)
  async catchAllPost(@Req() request: Request, @Res() response) {
    const path = request.url.split(
      this.config.get<string>(API_GLOBAL_BASE_URL),
    )[1];
    let values;
    try {
      values = await this.httpService.post(path);
      return response.json(values.data);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return response.status(error.response.status).json(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        return response.json(error.request);
      }
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      return response.json(error.message);
    }
  }
}
