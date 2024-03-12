import { NgFor } from '@angular/common';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgFor],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() page: number = 0;
  @Input() totalPages: number = 0;

  @Output() pageChange = new EventEmitter<number>();

  advancePage() {
    this.pageChange.emit(this.page + 1);
  }

  retreatPage() {
    this.pageChange.emit(this.page - 1);
  }
}
