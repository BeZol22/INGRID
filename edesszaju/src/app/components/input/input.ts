import {
  Component,
  ElementRef,
  computed,
  input,
  output,
  viewChild,
} from '@angular/core';
import { Icon, IconName } from '../icon/icon';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'tel'
  | 'url'
  | 'number'
  | 'search';

let nextId = 0;

@Component({
  selector: 'app-input',
  imports: [Icon],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class Input {
  readonly type = input<InputType>('text');
  readonly size = input<InputSize>('md');
  readonly value = input<string>('');
  readonly placeholder = input<string>('');
  readonly disabled = input(false, { transform: Boolean });
  readonly required = input(false, { transform: Boolean });
  readonly readonly = input(false, { transform: Boolean });

  readonly label = input<string | null>(null);
  readonly hint = input<string | null>(null);
  readonly error = input<string | null>(null);
  readonly icon = input<IconName | null>(null);
  readonly leadingText = input<string | null>(null);

  readonly inputId = input<string | null>(null);
  readonly name = input<string | null>(null);
  readonly autocomplete = input<string | null>(null);
  readonly inputMode = input<string | null>(null);
  readonly maxLength = input<number | null>(null);
  readonly minLength = input<number | null>(null);
  readonly min = input<number | string | null>(null);
  readonly max = input<number | string | null>(null);
  readonly pattern = input<string | null>(null);

  readonly valueChange = output<string>();
  readonly focused = output<FocusEvent>();
  readonly blurred = output<FocusEvent>();

  protected readonly autoId = `app-input-${++nextId}`;
  private readonly inputRef =
    viewChild.required<ElementRef<HTMLInputElement>>('input');

  protected readonly resolvedId = computed(() => this.inputId() ?? this.autoId);
  protected readonly hasError = computed(() => !!this.error());

  protected readonly rootClass = computed(() =>
    [
      'input',
      `input--${this.size()}`,
      this.icon() ? 'input--has-icon' : '',
      this.leadingText() ? 'input--has-leading-text' : '',
      this.hasError() ? 'is-error' : '',
      this.disabled() ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onInput(event: Event) {
    const v = (event.target as HTMLInputElement).value;
    this.valueChange.emit(v);
  }

  protected onFocus(event: FocusEvent) {
    this.focused.emit(event);
  }

  protected onBlur(event: FocusEvent) {
    this.blurred.emit(event);
  }

  /** Programmatically focus the input. */
  focus() {
    this.inputRef().nativeElement.focus();
  }

  /** Programmatically select the input contents. */
  select() {
    this.inputRef().nativeElement.select();
  }
}
