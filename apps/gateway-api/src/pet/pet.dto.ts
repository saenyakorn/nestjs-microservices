import { ApiProperty } from '@nestjs/swagger'

import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import {
  CreatePetParams,
  DeletePetParams,
  FindAllPetParams,
  PetSpecies,
  UpdatePetParams,
} from 'grpc'

export class FindAllPetQueryParams implements FindAllPetParams {
  @ApiProperty()
  @IsNumber()
  offset: number

  @ApiProperty()
  @IsNumber()
  limit: number
}

export class CreatePetRequestDTO implements CreatePetParams {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  owner: string

  @ApiProperty({ enum: PetSpecies })
  @IsString()
  @IsEnum(PetSpecies)
  species: PetSpecies
}

export class UpdatePetRequestDTO implements UpdatePetParams {
  @ApiProperty()
  @IsString()
  id: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  owner?: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsEnum(PetSpecies)
  species?: PetSpecies
}

export class DeletePetRequestDTO implements DeletePetParams {
  @ApiProperty()
  @IsString()
  id: string
}
