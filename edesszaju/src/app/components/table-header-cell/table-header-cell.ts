import { Component, computed, input, output } from '@angular/core';
import { Checkbox } from '../checkbox/checkbox';
import {
  TableHeaderLabel,
  TableHeaderSort,
} from '../table-header-label/table-header-label';

export type TableHeaderCellSize = 'sm' | 'md';

@Component({
  selector: 'app-table-header-cell',
  imports: [Checkbox, TableHeaderLabel],
  templateUrl: './table-header-cell.html',
  styleUrl: './table-header-cell.scss',
})
export class TableHeaderCell {
  readonly size = input<TableHeaderCellSize>('sm');
  readonly label = input<string | null>(null);
  readonly sort = input<TableHeaderSort>('none');
  readonly helpText = input<string | null>(null);
  readonly helpSupportingText = input<string | null>(null);
  /** Show the leading checkbox (used on the first column for "select all"). */
  readonly checkbox = input(false, { transform: Boolean });
  readonly checked = input(false, { transform: Boolean });
  readonly indeterminate = input(false, { transform: Boolean });
  readonly disabled = input(false, { transform: Boolean });
  readonly checkboxAriaLabel = input<string>('Select all');

  readonly sortChange = output<TableHeaderSort>();
  readonly checkedChange = output<boolean>();

  protected readonly hasLabel = computed(() => !!this.label());
  protected readonly hasContent = computed(
    () => this.hasLabel() || this.checkbox(),
  );

  protected readonly rootClass = computed(() =>
    [
      'table-header-cell',
      `table-header-cell--${this.size()}`,
      this.hasContent() ? '' : 'table-header-cell--empty',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onSortChange(value: TableHeaderSort) {
    this.sortChange.emit(value);
  }

  protected onCheckedChange(value: boolean) {
    this.checkedChange.emit(value);
  }
}
