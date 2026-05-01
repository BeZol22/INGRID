import {
  Component,
  ElementRef,
  computed,
  input,
  output,
  viewChild,
} from '@angular/core';

export type OtpCellSize = 'sm' | 'md' | 'lg';
export type OtpCellInputMode = 'numeric' | 'text';

let nextId = 0;

@Component({
  selector: 'app-otp-cell',
  templateUrl: './otp-cell.html',
  styleUrl: './otp-cell.scss',
})
export class OtpCell {
  readonly size = input<OtpCellSize>('md');
  readonly value = input<string>('');
  readonly placeholder = input<string>('0');
  readonly disabled = input(false, { transform: Boolean });
  readonly error = input(false, { transform: Boolean });
  readonly autoFocus = input(false, { transform: Boolean });
  readonly inputId = input<string | null>(null);
  readonly ariaLabel = input<string | null>(null);
  readonly inputMode = input<OtpCellInputMode>('numeric');
  readonly maxLength = input<number>(1);

  readonly valueChange = output<string>();
  readonly focused = output<FocusEvent>();
  readonly blurred = output<FocusEvent>();
  readonly keyDown = output<KeyboardEvent>();

  protected readonly autoId = `app-otp-cell-${++nextId}`;
  private readonly inputRef =
    viewChild.required<ElementRef<HTMLInputElement>>('input');

  protected readonly resolvedId = computed(() => this.inputId() ?? this.autoId);

  protected readonly rootClass = computed(() =>
    [
      'otp-cell',
      `otp-cell--${this.size()}`,
      this.value().length > 0 ? 'is-filled' : '',
      this.error() ? 'is-error' : '',
      this.disabled() ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onInput(event: Event) {
    const v = (event.target as HTMLInputElement).value;
    this.valueChange.emit(v);
  }

  protected onKeyDown(event: KeyboardEvent) {
    this.keyDown.emit(event);
  }

  protected onFocus(event: FocusEvent) {
    this.focused.emit(event);
  }

  protected onBlur(event: FocusEvent) {
    this.blurred.emit(event);
  }

  /** Programmatically focus the cell (used by an OTP group to auto-advance). */
  focus() {
    this.inputRef().nativeElement.focus();
  }

  /** Programmatically select the cell's content. */
  select() {
    this.inputRef().nativeElement.select();
  }
}
