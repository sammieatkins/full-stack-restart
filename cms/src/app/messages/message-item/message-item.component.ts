import { Component, OnInit, Input } from '@angular/core';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  standalone: false,

  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css',
})
export class MessageItemComponent implements OnInit {
  @Input() message!: Message;
  messageSender: string;
  constructor(private contactService: ContactService) {}
  ngOnInit() {
    if (!this.message) {
      console.error("Message is undefined in MessageItemComponent");
      return;
    }
  
    const contact: Contact | undefined = this.contactService.getContact(this.message.sender);
  
    if (contact) {
      this.messageSender = contact.name;
    } else {
      console.warn(`No contact found for sender ID: ${this.message.sender}`);
      this.messageSender = 'Unknown Sender';
    }
  }
  
}
