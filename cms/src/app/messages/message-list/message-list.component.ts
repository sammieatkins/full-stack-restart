import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',

  standalone: false,
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  private subscription: Subscription;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.subscription = this.messageService.messageChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );

    this.messageService.getMessages(); // 🔄 Trigger load from Firebase
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
