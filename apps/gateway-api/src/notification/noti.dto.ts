import { ApiProperty } from '@nestjs/swagger'

import { IsEmail, IsString } from 'class-validator'
import { NotifyParams } from 'grpc/src/proto/notification'

export class NotifyRequestDTO implements NotifyParams {
  @ApiProperty()
  @IsString()
  message: string

  @ApiProperty()
  @IsEmail()
  email: string
}
