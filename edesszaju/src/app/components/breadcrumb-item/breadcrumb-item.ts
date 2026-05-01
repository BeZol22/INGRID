import { Component, computed, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Icon, IconName } from '../icon/icon';

export type BreadcrumbItemVariant = 'text' | 'button';

@Component({
  selector: 'app-breadcrumb-item',
  imports: [Icon, RouterLink, NgTemplateOutlet],
  templateUrl: './breadcrumb-item.html',
  styleUrl: './breadcrumb-item.scss',
})
export class BreadcrumbItem {
  readonly label = input<string | null>(null);
  readonly icon = input<IconName | null>(null);
  readonly variant = input<BreadcrumbItemVariant>('text');
  readonly current = input(false, { transform: Boolean });
  readonly disabled = input(false, { transform: Boolean });
  readonly ariaLabel = input<string | null>(null);

  readonly routerLink = input<string | unknown[] | null>(null);
  readonly href = input<string | null>(null);
  readonly target = input<string | null>(null);
  readonly rel = input<string | null>(null);

  readonly clicked = output<MouseEvent>();

  protected readonly isIconOnly = computed(
    () => !!this.icon() && !this.label(),
  );

  protected readonly resolvedAriaLabel = computed(
    () => this.ariaLabel() ?? this.label() ?? null,
  );

  protected readonly rootClass = computed(() =>
    [
      'breadcrumb-item',
      `breadcrumb-item--${this.variant()}`,
      this.isIconOnly() ? 'breadcrumb-item--icon-only' : '',
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
