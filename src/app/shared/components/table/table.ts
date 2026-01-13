import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  template?: TemplateRef<any>;
}

export interface TableAction {
  icon: string;
  label: string;
  color?: 'primary' | 'secondary' | 'danger' | 'success';
  callback: (row: any) => void;
}

export type SortDirection = 'asc' | 'desc' | null;

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrls: ['./table.scss']
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() actions: TableAction[] = [];
  @Input() loading: boolean = false;
  @Input() selectable: boolean = false;
  @Input() emptyMessage: string = 'Nenhum dado encontrado';
  @Input() hoverable: boolean = true;
  @Input() striped: boolean = false;

  @Output() rowClick = new EventEmitter<any>();
  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() sortChange = new EventEmitter<{ column: string; direction: SortDirection }>();

  selectedRows: Set<any> = new Set();
  sortColumn: string | null = null;
  sortDirection: SortDirection = null;

  isAllSelected(): boolean {
    return this.data.length > 0 && this.selectedRows.size === this.data.length;
  }

  isIndeterminate(): boolean {
    return this.selectedRows.size > 0 && this.selectedRows.size < this.data.length;
  }

  toggleSelectAll(): void {
    if (this.isAllSelected()) {
      this.selectedRows.clear();
    } else {
      this.data.forEach(row => this.selectedRows.add(row));
    }
    this.emitSelection();
  }

  toggleSelectRow(row: any): void {
    if (this.selectedRows.has(row)) {
      this.selectedRows.delete(row);
    } else {
      this.selectedRows.add(row);
    }
    this.emitSelection();
  }

  isRowSelected(row: any): boolean {
    return this.selectedRows.has(row);
  }

  emitSelection(): void {
    this.selectionChange.emit(Array.from(this.selectedRows));
  }

  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }

  onSort(column: TableColumn): void {
    if (!column.sortable) return;

    if (this.sortColumn === column.key) {
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else if (this.sortDirection === 'desc') {
        this.sortDirection = null;
        this.sortColumn = null;
      } else {
        this.sortDirection = 'asc';
      }
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }

    this.sortChange.emit({
      column: this.sortColumn || '',
      direction: this.sortDirection
    });
  }

  getSortIcon(column: TableColumn): string {
    if (!column.sortable) return '';
    if (this.sortColumn !== column.key) return 'unfold_more';
    return this.sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }

  getCellValue(row: any, column: TableColumn): any {
    return column.key.split('.').reduce((obj, key) => obj?.[key], row);
  }

  executeAction(action: TableAction, row: any, event: Event): void {
    event.stopPropagation();
    action.callback(row);
  }

  trackByIndex(index: number): number {
    return index;
  }
}