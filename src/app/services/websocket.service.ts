import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  constructor(){}
  ws!: WebSocket;

  createObservableSocket(url: string): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable((observer) => {
      this.ws.onmessage = (event) => observer.next(JSON.parse(event.data));
      this.ws.onerror = (event) => observer.error(event);
      this.ws.onclose = (event) => {
        observer.next(event);
        observer.complete();
      }     
    });
  }

  // 向服务器端发送消息
  sendMessage(message: any) {
    message.token = localStorage.getItem("token") || "";
    if (this.ws.readyState === 3) {
      return;
    }
    if (this.ws.readyState === 1) {
      this.ws.send(JSON.stringify(message));
    }
  }
}
