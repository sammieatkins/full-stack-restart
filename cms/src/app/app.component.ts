import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cms';
  selectedFeature: string;

  switchView(selectedFeature: string) {
    if (this.selectedFeature?.toUpperCase() !== selectedFeature?.toUpperCase()) {
      this.selectedFeature = selectedFeature;
    }
  }
}
