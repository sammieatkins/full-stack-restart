import { Component, Input } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-detail',
  standalone: false,
  
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent {
  // In the document-detail.component.ts file, define a class input variable named document of the document data type.
  @Input() document: Document;

}
