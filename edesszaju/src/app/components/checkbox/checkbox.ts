import {
  Component,
  ElementRef,
  computed,
  effect,
  input,
  output,
  viewChild,
} from '@angular/core';

export type CheckboxType = 'checkbox' | 'radio';
export type CheckboxSize = 'sm' | 'md';

let nextId = 0;

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
})
export class Checkbox {
  readonly type = input<CheckboxType>('checkbox');
  readonly size = input<CheckboxSize>('sm');
  readonly checked = input(false, { transform: Boolean });
  readonly indeterminate = input(false, { transform: Boolean });
  readonly disabled = input(false, { transform: Boolean });
  readonly name = input<string | null>(null);
  readonly value = input<string | null>(null);
  readonly inputId = input<string | null>(null);
  readonly ariaLabel = input<string | null>(null);
  readonly label = input<string | null>(null);
  readonly supportingText = input<string | null>(null);

  readonly checkedChange = output<boolean>();

  protected readonly autoId = `app-checkbox-${++nextId}`;
  private readonly inputRef =
    viewChild.required<ElementRef<HTMLInputElement>>('input');

  // Mirror `indeterminate` to the native input — it's not a reflected attribute.
  constructor() {
    effect(() => {
      const el = this.inputRef().nativeElement;
      el.indeterminate = this.indeterminate();
    });
  }

  protected readonly resolvedId = computed(() => this.inputId() ?? this.autoId);

  protected readonly hasText = computed(
    () => !!this.label() || !!this.supportingText(),
  );

  protected readonly rootClass = computed(() =>
    [
      'checkbox',
      `checkbox--${this.type()}`,
      `checkbox--${this.size()}`,
      this.hasText() ? 'checkbox--labeled' : '',
      this.checked() ? 'is-checked' : '',
      this.indeterminate() ? 'is-indeterminate' : '',
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
