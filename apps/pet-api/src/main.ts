import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'

import { join } from 'path'

import { AppModule } from './app.module'

async function bootstrap() {
  const logger = new Logger('Application')

  const port = 4001
  const protoPath = join(process.cwd(), '../../packages/grpc/proto/pet.proto')
  const packageName = 'pet'

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${port}`,
      protoPath: protoPath,
      package: packageName,
    },
  })

  // tslint:disable-next-line: no-console
  app.listen().then(() => {
    logger.log(`pet-api is listening at port ${port}`)
  })
}
bootstrap()
