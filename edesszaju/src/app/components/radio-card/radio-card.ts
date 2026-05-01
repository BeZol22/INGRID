import { Component, computed, input, output } from '@angular/core';

export type RadioCardSize = 'sm' | 'md';
export type RadioCardIndicator = 'radio' | 'checkbox';

let nextId = 0;

@Component({
  selector: 'app-radio-card',
  templateUrl: './radio-card.html',
  styleUrl: './radio-card.scss',
})
export class RadioCard {
  readonly title = input<string>('');
  readonly description = input<string | null>(null);
  readonly size = input<RadioCardSize>('sm');
  readonly indicator = input<RadioCardIndicator>('radio');
  readonly checked = input(false, { transform: Boolean });
  readonly disabled = input(false, { transform: Boolean });

  readonly name = input<string | null>(null);
  readonly value = input<string | null>(null);
  readonly inputId = input<string | null>(null);
  readonly ariaLabel = input<string | null>(null);

  readonly checkedChange = output<boolean>();

  protected readonly autoId = `app-radio-card-${++nextId}`;

  protected readonly resolvedId = computed(() => this.inputId() ?? this.autoId);

  protected readonly rootClass = computed(() =>
    [
      'radio-card',
      `radio-card--${this.size()}`,
      `radio-card--${this.indicator()}`,
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
