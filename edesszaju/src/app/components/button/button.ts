import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon, IconName } from '../icon/icon';
import { Spinner } from '../spinner/spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'link';
export type ButtonColor = 'brand' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  imports: [Icon, RouterLink, Spinner],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly color = input<ButtonColor>('brand');
  readonly size = input<ButtonSize>('md');
  readonly type = input<ButtonType>('button');
  readonly disabled = input(false, { transform: Boolean });
  readonly loading = input(false, { transform: Boolean });
  readonly fullWidth = input(false, { transform: Boolean });
  readonly iconStart = input<IconName | null>(null);
  readonly iconEnd = input<IconName | null>(null);
  readonly iconOnly = input(false, { transform: Boolean });
  readonly ariaLabel = input<string | null>(null);

  // Navigation — when set, host renders <a> instead of <button>.
  readonly routerLink = input<string | unknown[] | null>(null);
  readonly href = input<string | null>(null);
  readonly target = input<string | null>(null);
  readonly rel = input<string | null>(null);

  readonly clicked = output<MouseEvent>();

  protected readonly rootClass = computed(() =>
    [
      'btn',
      `btn--${this.variant()}`,
      `btn--${this.size()}`,
      this.color() === 'destructive' ? 'btn--destructive' : '',
      this.iconOnly() ? 'btn--icon-only' : '',
      this.fullWidth() ? 'btn--full' : '',
      this.loading() ? 'is-loading' : '',
      this.disabled() || this.loading() ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onClick(event: MouseEvent) {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.clicked.emit(event);
  }
}
