import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'small' | 'medium' | 'large';
export type IconPosition = 'left' | 'right';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrls: ['./button.scss']
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'medium';
  @Input() text: string = '';
  @Input() icon: string = '';
  @Input() iconPosition: IconPosition = 'left';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() type: ButtonType = 'button';
  
  @Output() onClick: EventEmitter<Event> = new EventEmitter<Event>();

  handleClick(event: Event): void {
    if (!this.disabled && !this.loading) {
      this.onClick.emit(event);
    }
  }

  get buttonClasses(): string {
    const classes: string[] = [
      'btn',
      `btn-${this.variant}`,
      `btn-${this.size}`
    ];

    if (this.fullWidth) classes.push('btn-full-width');
    if (this.disabled) classes.push('btn-disabled');
    if (this.loading) classes.push('btn-loading');
    if (this.icon && !this.text) classes.push('btn-icon-only');

    return classes.join(' ');
  }
}