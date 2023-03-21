import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'

import { pathToProto } from 'grpc'
import { PET_PACKAGE_NAME } from 'grpc/src/proto/pet'

import { AppModule } from './app.module'

async function bootstrap() {
  const logger = new Logger('Application')

  const port = 4001
  const packageName = PET_PACKAGE_NAME

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${port}`,
      protoPath: pathToProto('pet'),
      package: packageName,
    },
  })

  app.listen().then(() => {
    logger.log(`pet-api is listening at port ${port}`)
  })
}
bootstrap()
