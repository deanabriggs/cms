import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
  standalone: false
})
export class ContactsFilterPipe implements PipeTransform {
  
  transform(contacts: Contact[], term: string): any {
    let filtered: Contact[] = [];

    if (term && term.length >0) {
      filtered = contacts.filter(
        (contact: Contact) => contact.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    // for(let contact of contacts) {
    //   if(contact.name.toLowerCase().includes(term.toLowerCase())) {
    //     filtered.push(contact);
    //   }
    // }

    if(filtered.length < 1) {
      return contacts;
    }

    return filtered;
  }
}
