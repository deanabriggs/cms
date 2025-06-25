import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { NgForm } from '@angular/forms';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          if(!params.id) {
            this.editMode = false;
            return;
          }
          this.originalContact = this.contactService.getContact(params.id);

          if(!this.originalContact) {
            return;
          }
          this.editMode = true;
          this.contact = JSON.parse(JSON.stringify(this.originalContact));

          if(this.contact.group) {
            this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
          }
        }
      )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    let contact = new Contact(
      "0",
      this.contact.name,
      this.contact.email,
      this.contact.phone,
      this.contact.imageUrl,
      this.contact.group
    );

    if(this.editMode == true) {
      this.contactService.updateContacts(this.originalContact, contact);
    } else {
      this.contactService.addContact(contact);
    };
    this.editMode = false;
    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }
}
