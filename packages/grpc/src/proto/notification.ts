/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Empty } from "../google/protobuf/empty";

export const protobufPackage = "notification";

export interface NotifyParams {
  message: string;
  email: string;
}

export interface NotificationMessage {
  id: string;
  message: string;
  email: string;
}

export const NOTIFICATION_PACKAGE_NAME = "notification";

export interface NotificationServiceClient {
  notify(request: NotifyParams, metadata?: Metadata): Observable<NotificationMessage>;

  getNotifications(request: Empty, metadata?: Metadata): Observable<NotificationMessage>;
}

export interface NotificationServiceController {
  notify(
    request: NotifyParams,
    metadata?: Metadata,
  ): Promise<NotificationMessage> | Observable<NotificationMessage> | NotificationMessage;

  getNotifications(request: Empty, metadata?: Metadata): Observable<NotificationMessage>;
}

export function NotificationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["notify", "getNotifications"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("NotificationService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("NotificationService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const NOTIFICATION_SERVICE_NAME = "NotificationService";
