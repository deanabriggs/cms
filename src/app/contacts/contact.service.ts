import { EventEmitter, Injectable, Output } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  maxContactId: number;

  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    // this.maxContactId = this.getMaxId();
  }

  getContacts() {
    this.http
      .get<Contact[]>('https://rkjcms-5f317-default-rtdb.firebaseio.com/contacts.json')
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => a.name.localeCompare(b.name));
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.error(error);
        }
      )
  }

  getContact(id: string): Contact | null {
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
    this.storeContacts();
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
      newContact.id = String(++this.maxContactId);
      this.contacts.push(newContact);
      this.storeContacts();
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
      this.storeContacts();
    }

    storeContacts() {
      const contactsJson = JSON.stringify(this.contacts);
      const headers = new HttpHeaders({ 'Contect-Type': 'application/json'});
      this.http
        .put('https://rkjcms-5f317-default-rtdb.firebaseio.com/contacts.json', contactsJson, {headers})
        .subscribe(() => {
          this.contactListChangedEvent.next(this.contacts.slice());
        })
    }
}
