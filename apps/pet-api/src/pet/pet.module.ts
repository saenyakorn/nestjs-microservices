import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { pathToProto } from 'grpc'
import { NOTIFICATION_PACKAGE_NAME, NOTIFICATION_SERVICE_NAME } from 'grpc/src/proto/notification'

import { PetController } from './pet.controller'
import { PetService } from './pet.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NOTIFICATION_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:4002',
          package: NOTIFICATION_PACKAGE_NAME,
          protoPath: pathToProto('notification'),
        },
      },
    ]),
  ],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
