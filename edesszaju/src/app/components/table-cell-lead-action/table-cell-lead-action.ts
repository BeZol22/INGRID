import { Component, computed, input, output } from '@angular/core';
import { Checkbox } from '../checkbox/checkbox';
import { Toggle } from '../toggle/toggle';

export type TableCellLeadActionType = 'checkbox' | 'radio' | 'toggle';

@Component({
  selector: 'app-table-cell-lead-action',
  imports: [Checkbox, Toggle],
  templateUrl: './table-cell-lead-action.html',
  styleUrl: './table-cell-lead-action.scss',
})
export class TableCellLeadAction {
  readonly type = input<TableCellLeadActionType>('checkbox');
  readonly checked = input(false, { transform: Boolean });
  readonly disabled = input(false, { transform: Boolean });
  readonly name = input<string | null>(null);
  readonly value = input<string | null>(null);
  readonly ariaLabel = input<string | null>(null);

  readonly checkedChange = output<boolean>();

  protected readonly isCheckbox = computed(() => this.type() === 'checkbox');
  protected readonly isRadio = computed(() => this.type() === 'radio');
  protected readonly isToggle = computed(() => this.type() === 'toggle');

  protected onCheckedChange(value: boolean) {
    this.checkedChange.emit(value);
  }
}
