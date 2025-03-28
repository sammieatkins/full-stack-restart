import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new Subject<Contact>();
  contactChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  constructor(private http: HttpClient) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }  

  getContacts(): void {
    this.http
      .get<Contact[]>(
        'https://fullstack-edc45-default-rtdb.firebaseio.com/contacts.json'
      )
      .subscribe({
        next: (contacts) => {
          this.contacts = contacts ?? [];
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => a.name.localeCompare(b.name));
          this.contactChangedEvent.next(this.contacts.slice());
        },
        error: (error) => {
          console.error('Error fetching contacts:', error);
        },
      });
  }

  storeContacts(): void {
    this.http
      .put(
        'https://fullstack-edc45-default-rtdb.firebaseio.com/contacts.json',
        this.contacts
      )
      .subscribe({
        next: () => {
          this.contactChangedEvent.next(this.contacts.slice());
        },
        error: (error) => {
          console.error('Error storing contacts:', error);
        },
      });
  }

  getContact(id: string): Contact | null {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  getMaxId() {
    let maxId = 0;

    this.contacts.forEach((contact) => {
      let currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  addContact(newContact: Contact): void {
    if (!newContact) return;

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();

    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact): void {
    if (!originalContact || !newContact) return;

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) return;

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;

    this.storeContacts();
  }

  deleteContact(contact: Contact): void {
    if (!contact) return;

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;

    this.contacts.splice(pos, 1);
    this.storeContacts();
  }
}
