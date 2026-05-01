import { Component, computed, input } from '@angular/core';

export type TableDividers = 'line' | 'alternating';
export type TableRadius = 'none' | 'md' | 'lg';

@Component({
  selector: 'app-table',
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  readonly dividers = input<TableDividers>('line');
  readonly radius = input<TableRadius>('lg');
  readonly bordered = input(true, { transform: Boolean });
  readonly shadow = input(true, { transform: Boolean });

  protected readonly rootClass = computed(() =>
    [
      'table-card',
      `table-card--${this.dividers()}`,
      `table-card--radius-${this.radius()}`,
      this.bordered() ? 'table-card--bordered' : '',
      this.shadow() ? 'table-card--shadow' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );
}
