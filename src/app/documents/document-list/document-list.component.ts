import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';

@Injectable()
@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit{
    documents: Document[] = []

    constructor(private documentService: DocumentsService) {}

    ngOnInit(): void {
      this.documents = this.documentService.getDocuments();
    }

    onSelectedDocument(document: Document) {
      this.documentService.documentSelectedEvent.emit(document);
    }
  }
