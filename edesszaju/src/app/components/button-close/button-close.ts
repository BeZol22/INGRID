import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';

export type ButtonCloseSize = 'sm' | 'md' | 'lg';
export type ButtonCloseType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button-close',
  imports: [Icon, RouterLink],
  templateUrl: './button-close.html',
  styleUrl: './button-close.scss',
})
export class ButtonClose {
  readonly size = input<ButtonCloseSize>('sm');
  readonly onDark = input(false, { transform: Boolean });
  readonly disabled = input(false, { transform: Boolean });
  readonly type = input<ButtonCloseType>('button');
  readonly ariaLabel = input<string>('Bezár');

  readonly routerLink = input<string | unknown[] | null>(null);
  readonly href = input<string | null>(null);
  readonly target = input<string | null>(null);
  readonly rel = input<string | null>(null);

  readonly clicked = output<MouseEvent>();

  protected readonly rootClass = computed(() =>
    [
      'btn-close',
      `btn-close--${this.size()}`,
      this.onDark() ? 'btn-close--on-dark' : '',
      this.disabled() ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onClick(event: MouseEvent) {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.clicked.emit(event);
  }
}
