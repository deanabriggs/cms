import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
// import { response } from 'express';

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
      .get<Document[]>('http://localhost:3000/documents')
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
    const pos = this.documents.findIndex(d => d.id === document.id);
    if (pos < 0) {return;}

    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {      
          this.documents.splice(pos, 1);
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.error(error);
        }
      );
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
    // newDocument.id = String(++this.maxDocumentId);
    // this.documents.push(newDocument);
    // this.storeDocuments();

    newDocument.id = "";
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<{message: string, document: Document}>('http://localhost:3000/documents', newDocument, { headers: headers })
      .subscribe(
        (responseData) => {
          this.documents.push(responseData.document);
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.error(error);
        }
      );
      // this.storeDocuments();
  }

  updateDocument(originalDoc: Document, newDoc: Document) {
    if((!originalDoc || !newDoc)) {
      return;
    }
    
    // const pos = this.documents.indexOf(originalDoc);
    const pos = this.documents.findIndex(d => d.id === originalDoc.id);
    if(pos < 0){
      return;
    }
    
    newDoc.id = originalDoc.id;
    newDoc._id = originalDoc._id; // Ensure the MongoDB _id is preserved

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('http://localhost:3000/documents/' + originalDoc.id, newDoc, { headers: headers })
      .subscribe((response: Response) => {
          this.documents[pos] = newDoc;
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
  }

  storeDocuments() {
    const docsJson = JSON.stringify(this.documents);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    this.http
      .put('http://localhost:3000/documents', docsJson, { headers })
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      })
  }
}
