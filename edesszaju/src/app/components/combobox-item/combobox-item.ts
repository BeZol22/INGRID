import { Component, computed, input, output } from '@angular/core';

export type ComboboxItemType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-combobox-item',
  templateUrl: './combobox-item.html',
  styleUrl: './combobox-item.scss',
})
export class ComboboxItem {
  readonly title = input<string>('');
  readonly subtitle = input<string | null>(null);
  readonly selected = input(false, { transform: Boolean });
  readonly active = input(false, { transform: Boolean });
  readonly disabled = input(false, { transform: Boolean });
  readonly type = input<ComboboxItemType>('button');
  readonly ariaLabel = input<string | null>(null);

  readonly clicked = output<MouseEvent>();

  protected readonly resolvedAriaLabel = computed(() => {
    const explicit = this.ariaLabel();
    if (explicit) return explicit;
    const sub = this.subtitle();
    return sub ? `${this.title()} ${sub}` : this.title();
  });

  protected readonly rootClass = computed(() =>
    [
      'combobox-item',
      this.selected() ? 'is-selected' : '',
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
