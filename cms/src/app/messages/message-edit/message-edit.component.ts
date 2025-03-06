import { Component } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  subject: string = '';
  msgText: string = '';
  sender: string = 'User'; // Temporary placeholder

  constructor(private messageService: MessageService) {}

  onSendMessage() {
    const newMessage = new Message(
      Math.random().toString(), // Generate a temporary ID
      this.subject,
      this.msgText,
      this.sender
    );

    this.messageService.addMessage(newMessage);

    // Clear input fields after sending
    this.subject = '';
    this.msgText = '';
  }
}
