import { ClientsModule, GrpcOptions, Transport } from '@nestjs/microservices'

import { join } from 'path'

import { PET_PACKAGE_NAME, PET_SERVICE_NAME } from '../proto/pet'

type Options = Omit<GrpcOptions['options'], 'package' | 'protoPath'>

function createGrpcClientModule(
  packageName: string,
  serviceName: string,
  protoName: string,
  options?: Options
) {
  return ClientsModule.register([
    {
      name: serviceName,
      transport: Transport.GRPC,
      options: {
        package: packageName,
        protoPath: join(__dirname, `../../proto/${protoName}.proto`),
        ...options,
      },
    },
  ])
}

export function createGrpcClientPetModule(options?: Options) {
  return createGrpcClientModule(PET_PACKAGE_NAME, PET_SERVICE_NAME, 'pet', options)
}
