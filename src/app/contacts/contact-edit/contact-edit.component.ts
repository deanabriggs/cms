import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent {

  constructor(private route: ActivatedRoute,
    private router: Router
  ) {}

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
