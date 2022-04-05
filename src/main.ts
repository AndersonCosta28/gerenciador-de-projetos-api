import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  process.env.TZ = 'America/Bahia';
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  const config = new DocumentBuilder()
    .setTitle('Gerenciamento de projetos e colaboradores')
    .setDescription('API afim de gerenciar projetos com nome, data, status e colabores participantes.')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', name: 'JWT', in: 'header' }, 'access-token') // Definir para para quem for usar a anotação @ApiBearerAuth('access-token') no controller. Fonte: https://stackoverflow.com/questions/54802832/is-it-possible-to-add-authentication-to-access-to-nestjs-swagger-explorer
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);  
  const port = process.env.PORT || 8080
  await app.listen(port, () => {
    console.log('Servidor iniciado na porta: ' + port)
  })
}
bootstrap();
