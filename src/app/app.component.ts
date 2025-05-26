import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cms';
  selectedFeature: string = "documents";  // variable to hold the selected feature, default to "documents"

  switchView(feature: string){
    this.selectedFeature = feature;  // sets the local variable "selectedFeature" to the parameter when the function is called
  }
}
