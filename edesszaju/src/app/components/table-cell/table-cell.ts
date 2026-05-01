import { Component, computed, input } from '@angular/core';

export type TableCellSize = 'sm' | 'md';
export type TableCellAlign = 'start' | 'center' | 'end';

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.html',
  styleUrl: './table-cell.scss',
})
export class TableCell {
  readonly size = input<TableCellSize>('sm');
  readonly align = input<TableCellAlign>('start');
  /** Adds the row-selected/hover background tint shown in the Figma. */
  readonly selected = input(false, { transform: Boolean });
  /** Render the leading checkbox slot used on the first column of selectable rows. */
  readonly hasLeading = input(false, { transform: Boolean });

  protected readonly rootClass = computed(() =>
    [
      'table-cell',
      `table-cell--${this.size()}`,
      `table-cell--align-${this.align()}`,
      this.selected() ? 'is-selected' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );
}
