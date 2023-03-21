import { Injectable } from '@nestjs/common'

import { Pet, PetSpecies } from 'grpc'
import { Observable } from 'rxjs'

@Injectable()
export class PetService {
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

  async findOne(id: string): Promise<Pet> {
    return this.pets.find((pet) => pet.id === id)
  }

  findAll(offset: number, limit: number): Observable<Pet> {
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
