import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS so your frontend can call backend
  app.enableCors();

  // ---- Swagger setup ----
  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('API documentation for Blog Platform')
    .setVersion('1.0')
    .addBearerAuth() // Optional: if using JWT authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UI available at http://localhost:3000/api

  // ---- Start server ----
  await app.listen(3000);
  console.log('Backend running on http://localhost:3000');
  console.log('Swagger docs available on http://localhost:3000/api');
}
bootstrap();

