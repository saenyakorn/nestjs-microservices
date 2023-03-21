import { Body, Controller, Get, Inject, Logger, OnModuleInit, Post } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { Metadata } from '@grpc/grpc-js'
import { NOTIFICATION_SERVICE_NAME, NotificationServiceClient } from 'grpc/src/proto/notification'

import { observableToPromise } from '../utils'
import { NotifyRequestDTO } from './noti.dto'

@ApiTags('notification')
@Controller('notification')
export class NotificationController implements OnModuleInit {
  private notificationServiceClient: NotificationServiceClient

  constructor(@Inject(NOTIFICATION_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.notificationServiceClient =
      this.client.getService<NotificationServiceClient>(NOTIFICATION_SERVICE_NAME)
  }

  @Get()
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiOkResponse({ description: 'Found notifications' })
  async findPets() {
    const observableNotifications = this.notificationServiceClient.getNotifications(
      {},
      new Metadata()
    )
    const notifications = await observableToPromise(observableNotifications)
    return {
      notifications,
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a notification' })
  @ApiCreatedResponse({ description: 'Created a notification' })
  async notify(@Body() body: NotifyRequestDTO) {
    const message = this.notificationServiceClient.notify(body, new Metadata())
    return message
  }
}
