import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guards/jwt.guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new JwtAuthGuard())
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,PATCH,DELETE,POST,HEAD',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
