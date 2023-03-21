import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'

import { Metadata } from '@grpc/grpc-js'
import { PET_SERVICE_NAME, PetServiceClient } from 'grpc'

@Controller('pets')
export class PetController implements OnModuleInit {
  private petServiceClient: PetServiceClient

  constructor(@Inject(PET_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.petServiceClient = this.client.getService<PetServiceClient>(PET_SERVICE_NAME)
  }

  @Get()
  findPets() {
    return this.petServiceClient.findAll({ offset: 0, limit: 10 }, new Metadata())
  }

  @Get(':id')
  findOnePet(@Param('id') id: string) {
    return this.petServiceClient.findOne({ id: id }, new Metadata())
  }
}
