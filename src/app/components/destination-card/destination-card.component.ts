import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-destination-card',
  standalone: true,
  imports: [],
  templateUrl: './destination-card.component.html',
  styleUrl: './destination-card.component.css'
})
export class DestinationCardComponent {
  @Input() destinationId: string = '';
  @Input() destinationLocation?: string;
  @Input() destinationAttractions?: string;
  @Input() deleteDestination(id: string): void {}
}
