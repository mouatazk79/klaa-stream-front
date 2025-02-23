import {  Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private client: Client;
  private notifications = new BehaviorSubject<Notification[]>([]);

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8090/ws'),
      onConnect: () => {
        console.log('Connected to WebSocket');
        this.subscribeToNotifications();
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
      }
    });

    this.client.activate();
  }

  private subscribeToNotifications(): void {
    this.client.subscribe('/topic/notifications', (message) => {
      const notification = JSON.parse(message.body);
      const currentNotifications = this.notifications.value;
      this.notifications.next([...currentNotifications, notification]);
    });
  }

  getNotifications() {
    return this.notifications.asObservable();
  }
}