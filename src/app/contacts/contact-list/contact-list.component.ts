import { Component, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  @Output() selectedContactEvent = new EventEmitter<Contact>();  // holder for the data to be "Output" to the parent and pushes on event
  
  contacts: Contact[] = [
    new Contact(1, "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771", "images/jacksonk.jpg"),
    new Contact(2, "Rex Barzee", "bbarzeer@byui.edu", "208-496-3768", "images/barzeer.jpg")
  ];

  onSelected(contact: Contact){   // method used to accept data from the DOM and push to EventEmitter
    this.selectedContactEvent.emit(contact); 
  }
}
