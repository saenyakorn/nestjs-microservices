import { Injectable, Logger } from '@nestjs/common'

import { NotificationMessage } from 'grpc/src/proto/notification'
import { Observable } from 'rxjs'

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name)

  private notifications: NotificationMessage[] = [
    {
      id: '1',
      message: 'Hello',
      email: 'hello@gmai.com',
    },
    {
      id: '2',
      message: 'Nice to meet you',
      email: 'nice@gmai.com',
    },
  ]

  async notify(message: string, email: string): Promise<NotificationMessage> {
    const maxId = Math.max(...this.notifications.map((noti) => parseInt(noti.id, 10)))
    const newNoti: NotificationMessage = {
      id: (maxId + 1).toString(),
      message,
      email,
    }
    this.notifications.push(newNoti)
    this.logger.log(`Sent notification to ${email} with message: ${message}`)
    return newNoti
  }

  getNotifications(): Observable<NotificationMessage> {
    return new Observable((observer) => {
      this.notifications.forEach((noti) => observer.next(noti))
      observer.complete()
    })
  }
}
