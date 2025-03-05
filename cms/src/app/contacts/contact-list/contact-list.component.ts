import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit{
  constructor(private contactService: ContactService) {}
  contacts: Contact[] = [];
  ngOnInit() {
   this.contacts = this.contactService.getContacts();
  }
  // @Output() selectedContactEvent = new EventEmitter<Contact>();

  // Inject the ContactService into the ContactListComponent class so that the new contactSelectedEvent emitter can be referenced in the ContactListComponent.

  

  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }
}
