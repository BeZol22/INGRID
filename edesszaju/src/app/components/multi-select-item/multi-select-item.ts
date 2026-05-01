import { Component, computed, input, output } from '@angular/core';

export type MultiSelectItemSize = 'sm' | 'md' | 'lg';
export type MultiSelectItemType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-multi-select-item',
  templateUrl: './multi-select-item.html',
  styleUrl: './multi-select-item.scss',
})
export class MultiSelectItem {
  readonly title = input<string>('');
  readonly supportingText = input<string | null>(null);
  readonly size = input<MultiSelectItemSize>('sm');
  readonly checked = input(false, { transform: Boolean });
  readonly active = input(false, { transform: Boolean });
  readonly disabled = input(false, { transform: Boolean });
  readonly type = input<MultiSelectItemType>('button');
  readonly ariaLabel = input<string | null>(null);

  readonly checkedChange = output<boolean>();

  protected readonly resolvedAriaLabel = computed(() => {
    const explicit = this.ariaLabel();
    if (explicit) return explicit;
    const sup = this.supportingText();
    return sup ? `${this.title()} ${sup}` : this.title();
  });

  protected readonly rootClass = computed(() =>
    [
      'multi-select-item',
      `multi-select-item--${this.size()}`,
      this.checked() ? 'is-checked' : '',
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
    this.checkedChange.emit(!this.checked());
  }
}
