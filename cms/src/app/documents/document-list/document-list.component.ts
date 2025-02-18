import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  // The DocumentListComponent must emit and output a custom event when the end user selects a document in the document list. Create a new EventEmitter object at the top of the class of the document data type and assign it to a class output variable named selectedDocumentEvent.
  
  // Open the document-list.component.ts file and define a variable named documents that is an array of document objects. Initialize the array with a list of four or five new document objects. Assign values to the id, name, description and url properties for each document object added to the array.
  documents = [
    {
      id: '1',
      name: 'Document 1',
      description: 'Description for Document 1',
      url: 'http://example.com/doc1'
    },
    {
      id: '2',
      name: 'Dos',
      description: 'Description for Document 2',
      url: 'http://example.com/doc2'
    },
    {
      id: '3',
      name: 'Document 3',
      description: 'Description for Document 3',
      url: 'http://example.com/doc3'
    },
    {
      id: '4',
      name: 'Document 4',
      description: 'Description for Document 4',
      url: 'http://example.com/doc4'
    }
  ];

  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  onSelectedDocument(document: Document) {
    // In this method, emit the selectedDocumentEvent and pass it the document object passed into the method.
    this.selectedDocumentEvent.emit(document);
  }
}
