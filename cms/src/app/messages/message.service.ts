import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[] = [];
  messageSelectedEvent = new Subject<Message>();
  messageChangedEvent = new Subject<Message[]>();
  maxMessageId: number;

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }

  getMessages(): void {
    this.http
      .get<Message[]>(
        'https://fullstack-edc45-default-rtdb.firebaseio.com/messages.json'
      )
      .subscribe({
        next: (messages) => {
          this.messages = messages ?? [];
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.next(this.messages.slice());
        },
        error: (error) => {
          console.error('Error fetching messages:', error);
        },
      });
  }

  storeMessages(): void {
    this.http
      .put(
        'https://fullstack-edc45-default-rtdb.firebaseio.com/messages.json',
        this.messages
      )
      .subscribe({
        next: () => {
          this.messageChangedEvent.next(this.messages.slice());
        },
        error: (error) => {
          console.error('Error storing messages:', error);
        },
      });
  }

  getMessage(id: string): Message | null {
    return this.messages.find((message) => message.id === id) ?? null;
  }

  getMaxId(): number {
    let maxId = 0;
    this.messages.forEach((message) => {
      const currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  addMessage(message: Message): void {
    if (!message) return;

    this.maxMessageId++;
    message.id = this.maxMessageId.toString();

    this.messages.push(message);
    this.storeMessages();
  }
}
