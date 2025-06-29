import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Injectable()
@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit, OnDestroy{
    private subscription: Subscription;
    documents: Document[] = []

    constructor(private documentService: DocumentService) {}

    ngOnInit(): void {
      this.subscription = this.documentService.documentListChangedEvent
        .subscribe((documentsList: Document[]) => {
            this.documents = documentsList;
          }
        )

      this.documentService.getDocuments();

      // this.documentService.documentChangedEvent
      //   .subscribe((docs: Document[]) => {
      //     this.documents = docs;
      //   }) 
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }


  }
