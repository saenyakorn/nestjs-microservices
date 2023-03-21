import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger'

import { Metadata } from '@grpc/grpc-js'
import { PET_SERVICE_NAME, PetServiceClient } from 'grpc'

import { observableToPromise } from '../utils'
import {
  CreatePetRequestDTO,
  DeletePetRequestDTO,
  FindAllPetQueryParams,
  UpdatePetRequestDTO,
} from './pet.dto'

@Controller('pets')
export class PetController implements OnModuleInit {
  private petServiceClient: PetServiceClient

  constructor(@Inject(PET_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.petServiceClient = this.client.getService<PetServiceClient>(PET_SERVICE_NAME)
  }

  @Get()
  @ApiQuery({ name: 'offset', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiOkResponse({ description: 'Found pets' })
  async findPets(@Query() queries: FindAllPetQueryParams) {
    const observablePets = this.petServiceClient.findAll(
      { offset: queries.offset, limit: queries.limit },
      new Metadata()
    )
    const pets = await observableToPromise(observablePets)

    return {
      pets: pets,
    }
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Found a pet' })
  findOnePet(@Param('id') id: string) {
    return this.petServiceClient.findOne({ id: id }, new Metadata())
  }

  @Post()
  @ApiOkResponse({ description: 'Created a pet' })
  createPet(@Body() body: CreatePetRequestDTO) {
    return this.petServiceClient.create(body, new Metadata())
  }

  @Put()
  @ApiOkResponse({ description: 'Updated a pet' })
  updatePet(@Body() body: UpdatePetRequestDTO) {
    return this.petServiceClient.update(body, new Metadata())
  }

  @Delete()
  @ApiOkResponse({ description: 'Deleted a pet' })
  deletePet(@Body() body: DeletePetRequestDTO) {
    return this.petServiceClient.delete(body, new Metadata())
  }
}
