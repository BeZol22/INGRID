import { Component, computed, input, output } from '@angular/core';
import { HelpIcon } from '../help-icon/help-icon';
import { Icon, IconName } from '../icon/icon';

export type TableHeaderSort = 'none' | 'sortable' | 'asc' | 'desc';

@Component({
  selector: 'app-table-header-label',
  imports: [HelpIcon, Icon],
  templateUrl: './table-header-label.html',
  styleUrl: './table-header-label.scss',
})
export class TableHeaderLabel {
  readonly label = input.required<string>();
  readonly sort = input<TableHeaderSort>('none');
  readonly helpText = input<string | null>(null);
  readonly helpSupportingText = input<string | null>(null);
  readonly disabled = input(false, { transform: Boolean });

  readonly sortChange = output<TableHeaderSort>();

  protected readonly isSortable = computed(() => this.sort() !== 'none');
  protected readonly hasHelp = computed(() => !!this.helpText());

  protected readonly sortIcon = computed<IconName | null>(() => {
    switch (this.sort()) {
      case 'asc':
        return 'arrow-up';
      case 'desc':
        return 'arrow-down';
      case 'sortable':
        return 'chevron-selector-vertical';
      default:
        return null;
    }
  });

  protected readonly ariaSort = computed(() => {
    switch (this.sort()) {
      case 'asc':
        return 'ascending';
      case 'desc':
        return 'descending';
      case 'sortable':
        return 'none';
      default:
        return null;
    }
  });

  protected readonly rootClass = computed(() =>
    [
      'table-header-label',
      `table-header-label--${this.sort()}`,
      this.hasHelp() ? 'table-header-label--has-help' : '',
      this.disabled() ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onSortClick() {
    if (this.disabled()) return;
    const next = nextSort(this.sort());
    if (next !== this.sort()) {
      this.sortChange.emit(next);
    }
  }
}

function nextSort(current: TableHeaderSort): TableHeaderSort {
  // Click cycle: sortable → asc → desc → sortable. 'none' stays 'none'.
  switch (current) {
    case 'sortable':
      return 'asc';
    case 'asc':
      return 'desc';
    case 'desc':
      return 'sortable';
    default:
      return 'none';
  }
}
