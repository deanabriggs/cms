import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { NgForm } from '@angular/forms';
import { ContactService } from '../contact.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

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
  dropInvalid: boolean = false;

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

          if (this.contact.group) {
            this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
          }
          console.log('Loaded groupContacts:', this.groupContacts);
        }
      )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    let contact = new Contact(
      "0",
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      value.group
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

  isInvalidContact(newContact: Contact) {
    if(!newContact) {
      return true;
    }
    if(this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for(let i=0; i<this.groupContacts.length; i++) {
      if(newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup(event: CdkDragDrop<Contact[]>) {
    const selectedContact: Contact = event.item.data;
    if(this.isInvalidContact(selectedContact)) {
      this.dropInvalid = true;
      setTimeout(() => {
        this.dropInvalid = false;
      }, 3000);
      return;
    }
    this.groupContacts.push(selectedContact);

    // if (!this.contact.group) {
    //   this.contact.group = [];
    // }
    // this.contact.group.push(selectedContact);

    this.contact.group = this.groupContacts;
    console.log('Dropped:', selectedContact);
  }

  onRemoveItem(index: number) {
    if(index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);

    this.contact.group = this.groupContacts;    
  }
  
}
