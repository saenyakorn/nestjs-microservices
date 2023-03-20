/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "pet";

export enum PetSpecies {
  DOG = 0,
  CAT = 1,
  BIRD = 2,
  OTHER = 3,
  UNRECOGNIZED = -1,
}

export interface Pet {
  id: string;
  name: string;
  owner: string;
  species: PetSpecies;
}

export interface FindAllParams {
  offset: number;
  limit: number;
}

export interface FindOneParams {
  id: string;
}

export interface CreateParams {
  name: string;
  owner: string;
  species: PetSpecies;
}

export interface UpdateParams {
  id: string;
  name?: string | undefined;
  owner?: string | undefined;
  species?: PetSpecies | undefined;
}

export interface DeleteParams {
  id: string;
}

export const PET_PACKAGE_NAME = "pet";

export interface PetServiceClient {
  findAll(request: FindAllParams, metadata: Metadata, ...rest: any): Observable<Pet>;

  findOne(request: FindOneParams, metadata: Metadata, ...rest: any): Observable<Pet>;

  create(request: CreateParams, metadata: Metadata, ...rest: any): Observable<Pet>;

  update(request: UpdateParams, metadata: Metadata, ...rest: any): Observable<Pet>;

  delete(request: DeleteParams, metadata: Metadata, ...rest: any): Observable<Pet>;
}

export interface PetServiceController {
  findAll(request: FindAllParams, metadata: Metadata, ...rest: any): Observable<Pet>;

  findOne(request: FindOneParams, metadata: Metadata, ...rest: any): Promise<Pet> | Observable<Pet> | Pet;

  create(request: CreateParams, metadata: Metadata, ...rest: any): Promise<Pet> | Observable<Pet> | Pet;

  update(request: UpdateParams, metadata: Metadata, ...rest: any): Promise<Pet> | Observable<Pet> | Pet;

  delete(request: DeleteParams, metadata: Metadata, ...rest: any): Promise<Pet> | Observable<Pet> | Pet;
}

export function PetServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findAll", "findOne", "create", "update", "delete"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("PetService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("PetService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PET_SERVICE_NAME = "PetService";
