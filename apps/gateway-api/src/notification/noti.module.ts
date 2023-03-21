import { Module } from '@nestjs/common'

import { createGrpcClientNotificationModule } from 'grpc'

import { NotificationController } from './noti.controller'

@Module({
  imports: [
    createGrpcClientNotificationModule({
      url: 'localhost:4002',
    }),
  ],
  controllers: [NotificationController],
  providers: [],
})
export class NotificationModule {}
