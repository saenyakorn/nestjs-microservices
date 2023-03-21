import { Module } from '@nestjs/common'

import { NotificationController } from './noti.controller'
import { NotificationService } from './noti.service'

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
