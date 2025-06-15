import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';


@Component({
  selector: 'cms-document-edit',
  standalone: false,
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit{
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
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
          this.originalDocument = this.documentService.getDocument(params.id);

          if(!this.originalDocument){
            return;
          }
          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
        }
    )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    let doc = new Document(
      "0", 
      value.name, 
      value.description, 
      value.url
    );
    if(this.editMode === true) {
      this.documentService.updateDocument(this.originalDocument, doc);
    } else {
      this.documentService.addDocument(doc);
    };
    this.editMode = false;
    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }
}
