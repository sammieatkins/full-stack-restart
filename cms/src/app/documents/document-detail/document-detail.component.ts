import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  standalone: false,

  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css',
})
export class DocumentDetailComponent implements OnInit {
  nativeWindow: any;
  document: Document | undefined;
  id: string; // ID parameter will be a string

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private windRefService: WindRefService
  ) {
    this.nativeWindow = this.windRefService.getNativeWindow();
  }

  ngOnInit() {
    // Subscribe to route params to get the document ID
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']; // Get the 'id' parameter from the URL
      this.document = this.documentService.getDocument(this.id); // Fetch the document
    });
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    // route back to the '/documents' URL
    this.router.navigate(['/documents']); 
 }
}
