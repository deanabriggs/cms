import { EventEmitter, Injectable, Output } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  // contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();

  contacts: Contact[] = [];
  maxContactId: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact | null {
    // return this.contacts.find(c => c.id == id);
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if(!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos <0) {
      return;
    }
    this.contacts.splice(pos, 1);

    // this.contactChangedEvent.emit(this.contacts.slice());
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  
    private getMaxId(): number {
      let maxId = 0;
      for (let ct of this.contacts) {
        let currentId = +ct.id;
        if(currentId > maxId){
          maxId = currentId;
        }
      }
      return maxId;
    }
    
    addContact(newContact: Contact) {
      if(!newContact) {
        return;
      }
      newContact.id = String(this.maxContactId++);
      this.contacts.push(newContact);
      let contactsListClone = this.contacts.slice();
      this.contactListChangedEvent.next(contactsListClone);
    }
  
    updateContacts(originalContact: Contact, newContact: Contact) {
      if((!originalContact || !newContact)) {
        return;
      }
      
      let pos = this.contacts.indexOf(originalContact);
      if(pos < 0){
        return;
      }
      
      newContact.id = originalContact.id;
      this.contacts[pos] = newContact;
  
      let contactsListClone = this.contacts.slice();
      this.contactListChangedEvent.next(contactsListClone);
    }
}
