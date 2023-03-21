import { Controller } from '@nestjs/common'

import { Metadata } from '@grpc/grpc-js'
import {
  CreatePetParams,
  DeletePetParams,
  FindAllPetParams,
  FindOnePetParams,
  Pet,
  PetServiceController,
  PetServiceControllerMethods,
  UpdatePetParams,
} from 'grpc'
import { Observable } from 'rxjs'

import { PetService } from './pet.service'

@Controller()
@PetServiceControllerMethods()
export class PetController implements PetServiceController {
  constructor(private readonly petService: PetService) {}

  async findOne(request: FindOnePetParams, metadata: Metadata, ...rest: any): Promise<Pet> {
    return this.petService.findOne(request.id)
  }

  findAll(request: FindAllPetParams, metadata: Metadata, ...rest: any): Observable<Pet> {
    return this.petService.findAll()
  }

  async create(request: CreatePetParams, metadata: Metadata, ...rest: any): Promise<Pet> {
    return this.petService.create({
      name: request.name,
      owner: request.owner,
      species: request.species,
    })
  }

  async update(request: UpdatePetParams, metadata: Metadata, ...rest: any): Promise<Pet> {
    return this.petService.update(request.id, {
      name: request.name,
      owner: request.owner,
      species: request.species,
    })
  }

  async delete(request: DeletePetParams, metadata: Metadata, ...rest: any): Promise<Pet> {
    return this.petService.delete(request.id)
  }
}
