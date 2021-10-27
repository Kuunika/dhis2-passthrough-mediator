import {
  Injectable,
  HttpModuleOptionsFactory,
  HttpModuleOptions,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  TIMEOUT,
  MAX_REDIRECTS,
  BASE_URL,
  PASSWORD,
  USERNAME,
} from '../common/constants/environment';
import * as https from 'https';

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  constructor(private readonly config: ConfigService) { }

  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: this.config.get<number>(TIMEOUT),
      maxRedirects: this.config.get<number>(MAX_REDIRECTS),
      baseURL: this.config.get<string>(BASE_URL),
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
      auth: {
        username: this.config.get<string>(USERNAME),
        password: this.config.get<string>(PASSWORD),
      },
    };
  }
}
