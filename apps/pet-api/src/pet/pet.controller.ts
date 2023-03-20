import { Controller, Get } from '@nestjs/common'

import { Metadata } from '@grpc/grpc-js'
import {
  CreateParams,
  FindAllParams,
  FindOneParams,
  Pet,
  PetServiceController,
  PetServiceControllerMethods,
  PetSpecies,
  UpdateParams,
} from 'grpc'
import { Observable } from 'rxjs'

import { PetService } from './pet.service'

@Controller()
@PetServiceControllerMethods()
export class PetController implements PetServiceController {
  constructor(private readonly petService: PetService) {}

  async findOne(request: FindOneParams, metadata: Metadata, ...rest: any): Promise<Pet> {
    return this.petService.findOne(request.id)
  }

  findAll(request: FindAllParams, metadata: Metadata, ...rest: any): Observable<Pet> {
    return this.petService.findAll()
  }

  async create(request: CreateParams, metadata: Metadata, ...rest: any): Promise<Pet> {
    return this.petService.create({
      name: request.name,
      owner: request.owner,
      species: request.species,
    })
  }

  async update(request: UpdateParams, metadata: Metadata, ...rest: any): Promise<Pet> {
    return this.petService.update(request.id, {
      name: request.name,
      owner: request.owner,
      species: request.species,
    })
  }

  async delete(request: FindOneParams, metadata: Metadata, ...rest: any): Promise<Pet> {
    return this.petService.delete(request.id)
  }
}
