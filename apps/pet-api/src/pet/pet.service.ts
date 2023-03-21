import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'

import { Metadata } from '@grpc/grpc-js'
import { NOTIFICATION_SERVICE_NAME, NotificationServiceClient } from 'grpc/src/proto/notification'
import { Pet, PetSpecies } from 'grpc/src/proto/pet'
import { Observable } from 'rxjs'

@Injectable()
export class PetService implements OnModuleInit {
  private readonly logger = new Logger(PetService.name)

  private pets: Pet[] = [
    {
      id: '1',
      name: 'Eren',
      owner: 'Tobias',
      species: PetSpecies.DOG,
    },
    {
      id: '2',
      name: 'Mikasa',
      owner: 'Mikan',
      species: PetSpecies.DOG,
    },
  ]

  private notificationServiceClient: NotificationServiceClient

  constructor(@Inject(NOTIFICATION_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.notificationServiceClient =
      this.client.getService<NotificationServiceClient>(NOTIFICATION_SERVICE_NAME)
  }

  async findOne(id: string): Promise<Pet> {
    return this.pets.find((pet) => pet.id === id)
  }

  findAll(offset: number, limit: number): Observable<Pet> {
    this.logger.debug(this.notificationServiceClient)
    return new Observable((observer) => {
      this.pets.slice(offset, offset + limit).forEach((pet) => observer.next(pet))
      observer.complete()
    })
  }

  async create(pet: Omit<Pet, 'id'>): Promise<Pet> {
    const maxId = Math.max(...this.pets.map((pet) => parseInt(pet.id, 10)))
    const newPet: Pet = {
      id: (maxId + 1).toString(),
      ...pet,
    }
    this.pets.push(newPet)
    this.logger.debug(`Created new pet: ${newPet.name}`)
    this.notificationServiceClient.notify(
      {
        message: `New pet created: ${newPet.name}`,
        email: 'pet-shop@gmail.com',
      },
      new Metadata()
    )
    return newPet
  }

  async update(petId: string, pet: Partial<Omit<Pet, 'id'>>): Promise<Pet> {
    const targetPet = this.pets.find((pet) => pet.id === petId)
    if (targetPet) {
      targetPet.name = pet.name ? pet.name : targetPet.name
      targetPet.owner = pet.owner ? pet.owner : targetPet.owner
      targetPet.species = pet.species ? pet.species : targetPet.species
    }
    return targetPet
  }

  async delete(id: string): Promise<Pet> {
    const targetPet = this.pets.find((pet) => pet.id === id)
    if (targetPet) {
      this.pets = this.pets.filter((pet) => pet.id !== id)
      return targetPet
    }
    return null
  }
}
