import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

function setupSwagger(app: INestApplication, pathPrefix: string) {
  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('The API Gateway for the Pet Store')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(pathPrefix, app, document)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  setupSwagger(app, 'docs')

  await app.listen(4000)
}

bootstrap()
