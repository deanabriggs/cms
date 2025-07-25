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
  term: string;

  constructor(private contactService: ContactService){}

  ngOnInit(): void {  
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe((cts: Contact[]) => {
        this.contacts = cts;
      })

    this.contactService.getContacts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(value: string) {
    this.term = value;
  }
}
