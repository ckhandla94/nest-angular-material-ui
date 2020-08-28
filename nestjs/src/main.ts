import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './models/configuration';
import * as expressSession from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<Configuration>>(ConfigService);
  app.enableCors();

  app.use(
    expressSession({
      secret: configService.get('appKey'),
      resave: true,
      saveUninitialized: true
    })
  );

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);


  await app.listen(configService.get('port', 3000), () => {
    console.log(`Server started on ${configService.get('port', 3000)}`)
  });

}
bootstrap();
