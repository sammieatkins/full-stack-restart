import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new Subject<Document>();
  documentChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): void {
    this.http
      .get<Document[]>(
        'https://fullstack-edc45-default-rtdb.firebaseio.com/documents.json'
      )
      .subscribe({
        next: (documents) => {
          this.documents = documents ?? [];
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => a.name.localeCompare(b.name));
          this.documentChangedEvent.next(this.documents.slice());
        },
        error: (error) => {
          console.error('Error fetching documents:', error);
        },
      });
  }

  storeDocuments(): void {
    this.http
      .put(
        'https://fullstack-edc45-default-rtdb.firebaseio.com/documents.json',
        this.documents
      )
      .subscribe({
        next: () => {
          // Emit updated list so the UI stays in sync
          this.documentChangedEvent.next(this.documents.slice());
        },
        error: (error) => {
          console.error('Error storing documents:', error);
        },
      });
  }

  getDocument(id: string): Document | null {
    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  getMaxId() {
    let maxId = 0;

    this.documents.forEach((document) => {
      let currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  addDocument(newDocument: Document): void {
    if (!newDocument) return;

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();

    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document): void {
    if (!originalDocument || !newDocument) return;

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) return;

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;

    this.storeDocuments();
  }

  deleteDocument(document: Document): void {
    if (!document) return;

    const pos = this.documents.indexOf(document);
    if (pos < 0) return;

    this.documents.splice(pos, 1);

    this.storeDocuments();
  }
}
