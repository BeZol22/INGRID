import { Component, computed, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Icon, IconName } from '../icon/icon';

export type ButtonGroupItemSize = 'sm' | 'md';
export type ButtonGroupItemIcon = 'none' | 'leading' | 'only' | 'dot';

@Component({
  selector: 'app-button-group-item',
  imports: [Icon, NgTemplateOutlet, RouterLink],
  templateUrl: './button-group-item.html',
  styleUrl: './button-group-item.scss',
})
export class ButtonGroupItem {
  readonly label = input<string>('');
  readonly size = input<ButtonGroupItemSize>('sm');
  readonly icon = input<ButtonGroupItemIcon>('none');
  /** Override the default leading icon (used when icon === 'leading' or 'only'). */
  readonly iconName = input<IconName | null>(null);
  readonly current = input(false, { transform: Boolean });
  readonly disabled = input(false, { transform: Boolean });
  readonly ariaLabel = input<string | null>(null);

  // Polymorphic root
  readonly routerLink = input<string | unknown[] | null>(null);
  readonly href = input<string | null>(null);

  readonly clicked = output<MouseEvent>();

  protected readonly iconMode = computed(() => this.icon());
  protected readonly isIconOnly = computed(() => this.icon() === 'only');
  protected readonly hasLeadingDot = computed(() => this.icon() === 'dot');
  protected readonly hasLeadingIcon = computed(
    () => this.icon() === 'leading' || this.icon() === 'only',
  );

  protected readonly rootClass = computed(() =>
    [
      'button-group-item',
      `button-group-item--${this.size()}`,
      `button-group-item--icon-${this.icon()}`,
      this.current() ? 'is-current' : '',
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
