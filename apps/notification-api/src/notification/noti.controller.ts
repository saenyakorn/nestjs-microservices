import { Controller } from '@nestjs/common'

import { Metadata } from '@grpc/grpc-js'
import { Empty } from 'grpc/src/google/protobuf/empty'
import {
  NotificationMessage,
  NotificationServiceController,
  NotificationServiceControllerMethods,
  NotifyParams,
} from 'grpc/src/proto/notification'
import { Observable } from 'rxjs'

import { NotificationService } from './noti.service'

@Controller()
@NotificationServiceControllerMethods()
export class NotificationController implements NotificationServiceController {
  constructor(private readonly notificationService: NotificationService) {}

  notify(
    request: NotifyParams,
    metadata: Metadata,
    ...rest: any
  ): NotificationMessage | Promise<NotificationMessage> | Observable<NotificationMessage> {
    return this.notificationService.notify(request.message, request.email)
  }

  getNotifications(
    request: Empty,
    metadata: Metadata,
    ...rest: any
  ): Observable<NotificationMessage> {
    return this.notificationService.getNotifications()
  }
}
