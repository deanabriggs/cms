import { Component, Injectable, OnInit } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './document.service';

@Injectable()
@Component({
  selector: 'cms-documents',
  standalone: false,
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css',
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documentService.documentSelectedEvent.subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    )
  }

}
