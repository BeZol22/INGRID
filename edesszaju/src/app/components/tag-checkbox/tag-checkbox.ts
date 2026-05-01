import { Component, computed, input, output } from '@angular/core';

export type TagCheckboxSize = 'sm' | 'md' | 'lg';

let nextId = 0;

@Component({
  selector: 'app-tag-checkbox',
  templateUrl: './tag-checkbox.html',
  styleUrl: './tag-checkbox.scss',
})
export class TagCheckbox {
  readonly size = input<TagCheckboxSize>('sm');
  readonly checked = input(false, { transform: Boolean });
  readonly disabled = input(false, { transform: Boolean });
  readonly name = input<string | null>(null);
  readonly value = input<string | null>(null);
  readonly inputId = input<string | null>(null);
  readonly ariaLabel = input<string | null>(null);

  readonly checkedChange = output<boolean>();

  protected readonly autoId = `app-tag-checkbox-${++nextId}`;

  protected readonly resolvedId = computed(() => this.inputId() ?? this.autoId);

  protected readonly rootClass = computed(() =>
    [
      'tag-checkbox',
      `tag-checkbox--${this.size()}`,
      this.checked() ? 'is-checked' : '',
      this.disabled() ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onChange(event: Event) {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    const target = event.target as HTMLInputElement;
    this.checkedChange.emit(target.checked);
  }
}
