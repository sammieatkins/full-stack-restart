import { Component, Input } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-item',
  standalone: false,
  
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css'
})
export class DocumentItemComponent {
  // Open the document-item.component.ts file and define an input class variable named document of the document data type. You will need to import the Document model class.
  @Input() document: Document;

}
