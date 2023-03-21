import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'

import { NOTIFICATION_PACKAGE_NAME } from 'grpc/src/proto/notification'
import { join } from 'path'

import { AppModule } from './app.module'

async function bootstrap() {
  const logger = new Logger('Application')

  const port = 4002
  const protoPath = join(process.cwd(), '../../packages/grpc/proto/notification.proto')
  const packageName = NOTIFICATION_PACKAGE_NAME

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${port}`,
      protoPath: protoPath,
      package: packageName,
    },
  })

  app.listen().then(() => {
    logger.log(`notification-api is listening at port ${port}`)
  })
}
bootstrap()
