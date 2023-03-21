import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { pathToProto } from 'grpc'
import { PET_PACKAGE_NAME, PET_SERVICE_NAME } from 'grpc/src/proto/pet'

import { PetController } from './pet.controller'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PET_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:4001',
          package: PET_PACKAGE_NAME,
          protoPath: pathToProto('pet'),
        },
      },
    ]),
  ],
  controllers: [PetController],
  providers: [],
})
export class PetModule {}
