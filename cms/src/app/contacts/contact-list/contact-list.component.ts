import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent implements OnInit, OnDestroy {
  constructor(private contactService: ContactService) {}
  private subscription: Subscription;
  contacts: Contact[] = [];
  term: string = '';

  ngOnInit() {
    this.subscription = this.contactService.contactChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );

    this.contactService.getContacts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(value: string) {
    this.term = value;
  }
}
