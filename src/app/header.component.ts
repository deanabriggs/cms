import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cms-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() selectedFeatureEvent = new EventEmitter<string>(); // outputs data from the method to the parent

  onSelect(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);  //fires the output
  }
}
