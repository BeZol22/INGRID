import { Component, computed, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Icon, IconName } from '../icon/icon';

export type TabButtonVariant =
  | 'brand'
  | 'gray'
  | 'white'
  | 'minimal'
  | 'underline'
  | 'line';
export type TabButtonSize = 'sm' | 'md';

@Component({
  selector: 'app-tab-button',
  imports: [Icon, NgTemplateOutlet, RouterLink],
  templateUrl: './tab-button.html',
  styleUrl: './tab-button.scss',
})
export class TabButton {
  readonly label = input.required<string>();
  readonly variant = input<TabButtonVariant>('brand');
  readonly size = input<TabButtonSize>('sm');
  readonly current = input(false, { transform: Boolean });
  readonly disabled = input(false, { transform: Boolean });
  /** Show the leading "placeholder" dot/icon. */
  readonly icon = input(true, { transform: Boolean });
  /** Override icon glyph. Falls back to the small dot indicator. */
  readonly iconName = input<IconName | null>(null);
  /** Trailing count text. `null` hides the badge. */
  readonly badge = input<string | number | null>(null);
  readonly ariaLabel = input<string | null>(null);

  // Polymorphic root — when set, renders as anchor instead of button
  readonly routerLink = input<string | unknown[] | null>(null);
  readonly href = input<string | null>(null);

  readonly clicked = output<MouseEvent>();

  protected readonly badgeText = computed(() => {
    const v = this.badge();
    if (v == null) return null;
    return String(v);
  });

  protected readonly rootClass = computed(() =>
    [
      'tab-button',
      `tab-button--${this.variant()}`,
      `tab-button--${this.size()}`,
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
