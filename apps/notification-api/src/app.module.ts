import { Module } from '@nestjs/common'

import { NotificationModule } from './notification/noti.module'

@Module({
  imports: [NotificationModule],
})
export class AppModule {}
