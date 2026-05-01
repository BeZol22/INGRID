import { Component, computed, input, output } from '@angular/core';

export type PaginationDotShape = 'dot' | 'line';
export type PaginationDotSize = 'md' | 'lg';

@Component({
  selector: 'app-pagination-dot',
  templateUrl: './pagination-dot.html',
  styleUrl: './pagination-dot.scss',
})
export class PaginationDot {
  readonly shape = input<PaginationDotShape>('dot');
  readonly size = input<PaginationDotSize>('md');
  readonly current = input(false, { transform: Boolean });
  readonly disabled = input(false, { transform: Boolean });
  readonly ariaLabel = input<string | null>(null);

  readonly clicked = output<MouseEvent>();

  protected readonly rootClass = computed(() =>
    [
      'pagination-dot',
      `pagination-dot--${this.shape()}`,
      `pagination-dot--${this.size()}`,
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
