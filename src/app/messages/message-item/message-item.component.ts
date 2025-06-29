import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';


@Injectable()
@Component({
  selector: 'cms-message-item',
  standalone: false,
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent implements OnInit { 
  @Input() message: Message;
  messageSender: string;

  constructor ( private contactService: ContactService ) {}

  ngOnInit(): void {
    const contact: Contact = this.contactService.getContact(this.message.sender);
    if (contact) {
      this.messageSender = contact.name;
    } else {
      this.messageSender = 'Unknown';
      console.warn(`No contact found for sender ID: ${this.message.sender}`);
    }
  }
}
