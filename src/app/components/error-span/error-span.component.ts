import { NgIf} from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-span',
  standalone: true,
  imports: [NgIf],
  templateUrl: './error-span.component.html',
  styleUrl: './error-span.component.css'
})
export class ErrorSpanComponent {
  @Input() error?: any;
  @Input() hidden?: boolean;
}
