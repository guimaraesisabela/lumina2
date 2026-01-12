import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.scss']
})
export class SearchBarComponent {
  @Input() placeholder: string = 'Buscar...';
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }

  onSearch(): void {
    this.search.emit(this.value);
  }

  onClear(): void {
    this.value = '';
    this.valueChange.emit(this.value);
    this.search.emit(this.value);
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }
}