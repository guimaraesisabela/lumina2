import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface DropdownOption {
  label: string;
  value: any;
  disabled?: boolean;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.html',
  styleUrls: ['./dropdown.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true
  }]
})
export class DropdownComponent implements ControlValueAccessor {
  @Input() options: DropdownOption[] = [];
  @Input() placeholder: string = 'Selecione...';
  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Output() selectionChange = new EventEmitter<any>();

  isOpen: boolean = false;
  selectedOption: DropdownOption | null = null;
  value: any = null;

  onChange: any = () => {};
  onTouched: any = () => {};

  toggleDropdown(): void {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  }

  selectOption(option: DropdownOption): void {
    if (!option.disabled) {
      this.selectedOption = option;
      this.value = option.value;
      this.isOpen = false;
      this.onChange(this.value);
      this.selectionChange.emit(this.value);
    }
  }

  closeDropdown(): void {
    this.isOpen = false;
  }

  writeValue(value: any): void {
    this.value = value;
    this.selectedOption = this.options.find(opt => opt.value === value) || null;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get displayValue(): string {
    return this.selectedOption?.label || this.placeholder;
  }
}