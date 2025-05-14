import { Component } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  contacts: Contact[] = [
    new Contact(1, "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771", "images/jacksonk.jpg"),
    new Contact(2, "Rex Barzee", "bbarzeer@byui.edu", "208-496-3768", "images/barzeer.jpg")
  ];
}
