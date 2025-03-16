import { Component, EventEmitter, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  standalone: false, 
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit {
  constructor(private documentService: DocumentService) {}
  documents: Document[] = [];

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  }

}
