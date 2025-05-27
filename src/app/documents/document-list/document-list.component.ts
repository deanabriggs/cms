import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(1, "Application", "Job Application Template", "www.applications.org"),
    new Document(2, "W4", "Payroll Tax Form", "www.irs.gov/w4"),
    new Document(3, "Benefits", "Benefits offered", "www.company.com/benefits"),
    new Document(4, "Handbook", "Employee Handbook", "www.company.com/handbook"),
    new Document(5, "ACH", "Direct Deposit Form", "www.company.com/ACH")
  ]

    onSelectedDocument(document:Document){
      this.selectedDocumentEvent.emit(document);
    }
}
