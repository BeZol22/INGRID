import { Component, computed, input, output } from '@angular/core';

export type ToggleSize = 'sm' | 'md';
export type ToggleVariant = 'default' | 'slim';

let nextId = 0;

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.html',
  styleUrl: './toggle.scss',
})
export class Toggle {
  readonly checked = input(false, { transform: Boolean });
  readonly size = input<ToggleSize>('sm');
  readonly variant = input<ToggleVariant>('default');
  readonly disabled = input(false, { transform: Boolean });
  readonly name = input<string | null>(null);
  readonly value = input<string | null>(null);
  readonly inputId = input<string | null>(null);
  readonly ariaLabel = input<string | null>(null);
  readonly label = input<string | null>(null);
  readonly supportingText = input<string | null>(null);

  readonly checkedChange = output<boolean>();

  protected readonly autoId = `app-toggle-${++nextId}`;

  protected readonly resolvedId = computed(() => this.inputId() ?? this.autoId);

  protected readonly hasText = computed(
    () => !!this.label() || !!this.supportingText(),
  );

  protected readonly rootClass = computed(() =>
    [
      'toggle',
      `toggle--${this.size()}`,
      `toggle--${this.variant()}`,
      this.hasText() ? 'toggle--labeled' : '',
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
