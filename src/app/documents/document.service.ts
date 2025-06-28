import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  // documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  
  documents: Document[] = [];
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | null {
    return this.documents.find(d => d.id == id);
  }

  deleteDocument(document: Document){
    if(!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  private getMaxId(): number {
    let maxId = 0;
    for (let doc of this.documents) {
      let currentId = +doc.id;
      if(currentId > maxId){
        maxId = currentId;
      }
    }
    return maxId;
  }
  
  addDocument(newDocument: Document) {
    if(!newDocument) {
      return;
    }
    newDocument.id = String(++this.maxDocumentId);
    this.documents.push(newDocument);
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  updateDocument(originalDoc: Document, newDoc: Document) {
    if((!originalDoc || !newDoc)) {
      return;
    }
    
    let pos = this.documents.indexOf(originalDoc);
    if(pos < 0){
      return;
    }
    
    newDoc.id = originalDoc.id;
    this.documents[pos] = newDoc;

    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }
}
