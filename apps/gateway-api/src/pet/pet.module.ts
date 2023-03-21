import { Module } from '@nestjs/common'

import { createGrpcClientPetModule } from 'grpc'

import { PetController } from './pet.controller'

@Module({
  imports: [
    createGrpcClientPetModule({
      url: 'localhost:4001',
    }),
  ],
  controllers: [PetController],
  providers: [],
})
export class PetModule {}
