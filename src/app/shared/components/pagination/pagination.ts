import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.scss']
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() maxVisiblePages: number = 5;
  @Input() showFirstLast: boolean = false;
  
  @Output() pageChange = new EventEmitter<number>();

  visiblePages: (number | string)[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentPage'] || changes['totalPages'] || changes['maxVisiblePages']) {
      this.updateVisiblePages();
    }
  }

  updateVisiblePages(): void {
    this.visiblePages = [];
    
    if (this.totalPages <= this.maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        this.visiblePages.push(i);
      }
      return;
    }

    const halfVisible = Math.floor(this.maxVisiblePages / 2);
    let startPage = Math.max(1, this.currentPage - halfVisible);
    let endPage = Math.min(this.totalPages, this.currentPage + halfVisible);

    if (this.currentPage <= halfVisible) {
      endPage = this.maxVisiblePages;
    }

    if (this.currentPage > this.totalPages - halfVisible) {
      startPage = this.totalPages - this.maxVisiblePages + 1;
    }

    if (startPage > 1) {
      this.visiblePages.push(1);
      if (startPage > 2) {
        this.visiblePages.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      this.visiblePages.push(i);
    }

    if (endPage < this.totalPages) {
      if (endPage < this.totalPages - 1) {
        this.visiblePages.push('...');
      }
      this.visiblePages.push(this.totalPages);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  firstPage(): void {
    this.goToPage(1);
  }

  lastPage(): void {
    this.goToPage(this.totalPages);
  }

  isNumber(value: number | string): boolean {
    return typeof value === 'number';
  }

  get hasPrevious(): boolean {
    return this.currentPage > 1;
  }

  get hasNext(): boolean {
    return this.currentPage < this.totalPages;
  }
}