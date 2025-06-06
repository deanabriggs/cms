import { Component, Injectable, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Injectable()
@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit{
    documents: Document[] = []

    constructor(private documentService: DocumentService) {}

    ngOnInit(): void {
      this.documents = this.documentService.getDocuments();
    }

    onSelectedDocument(document: Document) {
      this.documentService.documentSelectedEvent.emit(document);
    }
  }
