import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Injectable()
@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})

export class ContactListComponent implements OnInit, OnDestroy{
  private subscription: Subscription;
  contacts: Contact[] = [];
  individualContacts: Contact[] = [];
  groupedContacts: Contact[] = [];

  constructor(private contactService: ContactService){}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.separateContacts(this.contacts)
    
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe((cts: Contact[]) => {
        this.contacts = cts;
        this.separateContacts(cts);
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private separateContacts(contacts: Contact[]) {
    this.groupedContacts = contacts.filter(c => Array.isArray(c.group) && c.group.length > 0);

    const groupMemberIds = new Set(
      this.groupedContacts.flatMap(group => group.group.map(member => String(member.id)))
    );

    this.individualContacts = contacts.filter(
      c => !Array.isArray(c.group) && !groupMemberIds.has(String(c.id))
    )
  }
}
