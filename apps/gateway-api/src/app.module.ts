import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { NotificationModule } from './notification/noti.module'
import { PetModule } from './pet/pet.module'

@Module({
  imports: [PetModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
