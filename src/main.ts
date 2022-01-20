import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { API_GLOBAL_BASE_URL, PORT, DEFAULT_PORT } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  app.use(helmet());
  const configService = app.get<ConfigService>(ConfigService);
  const globalPrefix = configService.get<string>(API_GLOBAL_BASE_URL);
  const port = configService.get<number>(PORT) || DEFAULT_PORT;

  app.setGlobalPrefix(globalPrefix);
  await app.listen(port);
}
bootstrap();
