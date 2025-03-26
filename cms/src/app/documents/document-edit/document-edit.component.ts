import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from '../document.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-document-edit',
  standalone: false,

  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css',
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      if (id === undefined || id === null) {
        this.editMode = false;
        return;
      }
      this.originalDocument = this.documentService.getDocument(id);
      if (
        this.originalDocument === undefined ||
        this.originalDocument === null
      ) {
        return;
      }
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newDocument = new Document(
      value.id,
      value.name,
      value.description,
      value.url
    );
    if (this.editMode === true) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
  }
}
