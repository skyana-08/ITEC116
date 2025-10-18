import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Allow requests from React frontend
  app.enableCors({
    origin: 'http://localhost:5173', // your React app's address
    methods: 'GET,POST,PATCH,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
