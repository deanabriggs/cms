import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    // // this.documents = MOCKDOCUMENTS;
    // this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    this.http
      .get<Document[]>('https://rkjcms-5f317-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        // success method
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => a.name.localeCompare(b.name));
          this.documentListChangedEvent.next(this.documents.slice());
        },
        // error method
        (error: any) => {
          console.error(error);
        }
      )
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
    
    this.storeDocuments();
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
    
    this.storeDocuments();
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

    this.storeDocuments();
  }

  storeDocuments() {
    const docsJson = JSON.stringify(this.documents);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    this.http
      .put('https://rkjcms-5f317-default-rtdb.firebaseio.com/documents.json', docsJson, { headers })
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      })
  }
}
