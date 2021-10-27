import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { API_GLOBAL_BASE_URL, PORT, DEFAULT_PORT } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const globalPrefix = configService.get<string>(API_GLOBAL_BASE_URL);
  const port = configService.get<number>(PORT) || DEFAULT_PORT;

  app.enableCors({
    origin: true,
    methods: 'GET, POST, HEAD, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  app.setGlobalPrefix(globalPrefix);
  await app.listen(port);
}
bootstrap();
