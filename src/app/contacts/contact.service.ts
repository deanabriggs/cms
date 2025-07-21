import { EventEmitter, Injectable, Output } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { response } from 'express';

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
    if (this.contacts.length > 0) {
      this.contactListChangedEvent.next(this.contacts.slice());
      return;
    }

    this.http
      .get<Contact[]>('http://localhost:3000/contacts')
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => a.name.localeCompare(b.name));
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
          console.error(error);
      }
    );
  }

  getContact(id: string): Contact | null {
    for (let contact of this.contacts) {
      if (contact.id === id || contact._id === id) {
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if(!contact) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.delete('http://localhost:3000/contacts/' + contact.id, { headers: headers })
      .subscribe(() => {
        const pos = this.contacts.indexOf(contact);
        if (pos < 0) {
          return;
      }
      this.contacts.splice(pos, 1);
      this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.error(error);
      });
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
    // newContact.id = String(++this.maxContactId);
    // this.contacts.push(newContact);
    // this.storeContacts();

    newContact.id = "";
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{message: String, contact: Contact}>('http://localhost:3000/contacts', newContact, { headers: headers })
      .subscribe(
        (responseData) => {
          this.contacts.push(responseData.contact);
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        // error method
        (error: any) => {
          console.error(error);
        }
      );
  }

  updateContacts(originalContact: Contact, newContact: Contact) {
    if((!originalContact || !newContact)) {
      return;
    }
    const pos = this.contacts.findIndex(c => c.id === originalContact.id);
    if(pos < 0){
      return;
    }
    newContact.id = originalContact.id;
    newContact._id = originalContact._id; // Ensure the MongoDB _id is preserved

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put('http://localhost:3000/contacts/' + originalContact.id, newContact, { headers: headers })  
      .subscribe(
        () => {
          this.contacts[pos] = newContact;
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }

  storeContacts() {
    const contactsJson = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    this.http
      .put('http://localhost:3000/contacts', contactsJson, {headers})
      .subscribe(() => {
        this.contactListChangedEvent.next(this.contacts.slice());
      })
    }
}
