import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'cms-document-detail',
  standalone: false,

  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css',
})
export class DocumentDetailComponent implements OnInit {
  document: Document | undefined;
  id: string; // ID parameter will be a string

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to route params to get the document ID
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']; // Get the 'id' parameter from the URL
      this.document = this.documentService.getDocument(this.id); // Fetch the document
    });
  }
}
