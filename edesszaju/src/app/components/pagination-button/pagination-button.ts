import { Component, computed, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Icon, IconName } from '../icon/icon';

export type PaginationButtonType =
  | 'number'
  | 'leading-icon'
  | 'trailing-icon'
  | 'icon-only';

@Component({
  selector: 'app-pagination-button',
  imports: [Icon, RouterLink, NgTemplateOutlet],
  templateUrl: './pagination-button.html',
  styleUrl: './pagination-button.scss',
})
export class PaginationButton {
  readonly type = input<PaginationButtonType>('number');
  readonly label = input<string | null>(null);
  readonly page = input<number | string | null>(null);
  readonly icon = input<IconName | null>(null);
  readonly active = input(false, { transform: Boolean });
  readonly disabled = input(false, { transform: Boolean });
  readonly ariaLabel = input<string | null>(null);

  readonly routerLink = input<string | unknown[] | null>(null);
  readonly href = input<string | null>(null);

  readonly clicked = output<MouseEvent>();

  protected readonly resolvedIcon = computed<IconName>(() => {
    const explicit = this.icon();
    if (explicit) return explicit;
    return this.type() === 'leading-icon' ? 'arrow-left' : 'arrow-right';
  });

  protected readonly resolvedAriaLabel = computed(() => {
    const explicit = this.ariaLabel();
    if (explicit) return explicit;
    if (this.type() === 'number') {
      const p = this.page();
      return typeof p === 'number' ? `${p}. oldal` : null;
    }
    return this.label();
  });

  protected readonly rootClass = computed(() =>
    [
      'pagination-button',
      `pagination-button--${this.type()}`,
      this.active() ? 'is-active' : '',
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
