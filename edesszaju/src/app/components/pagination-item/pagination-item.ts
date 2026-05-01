import { Component, computed, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

export type PaginationItemShape = 'square' | 'circle';

@Component({
  selector: 'app-pagination-item',
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './pagination-item.html',
  styleUrl: './pagination-item.scss',
})
export class PaginationItem {
  readonly page = input<number | string>('');
  readonly shape = input<PaginationItemShape>('square');
  readonly active = input(false, { transform: Boolean });
  readonly disabled = input(false, { transform: Boolean });
  readonly ariaLabel = input<string | null>(null);

  readonly routerLink = input<string | unknown[] | null>(null);
  readonly href = input<string | null>(null);

  readonly clicked = output<MouseEvent>();

  protected readonly resolvedAriaLabel = computed(() => {
    const explicit = this.ariaLabel();
    if (explicit) return explicit;
    const p = this.page();
    return typeof p === 'number' ? `${p}. oldal` : null;
  });

  protected readonly rootClass = computed(() =>
    [
      'pagination-item',
      `pagination-item--${this.shape()}`,
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
