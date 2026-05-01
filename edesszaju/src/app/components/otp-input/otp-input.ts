import {
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  viewChildren,
} from '@angular/core';
import { OtpCell, OtpCellSize } from '../otp-cell/otp-cell';

let nextId = 0;

@Component({
  selector: 'app-otp-input',
  imports: [OtpCell],
  templateUrl: './otp-input.html',
  styleUrl: './otp-input.scss',
})
export class OtpInput {
  readonly digits = input<number>(6);
  readonly size = input<OtpCellSize>('md');
  readonly value = input<string>('');
  readonly disabled = input(false, { transform: Boolean });
  readonly autoFocus = input(false, { transform: Boolean });

  readonly label = input<string | null>(null);
  readonly hint = input<string | null>(null);
  readonly error = input<string | null>(null);

  /**
   * If true, render a "-" between the two halves of the code (e.g. XXX-XXX).
   * Defaults to true for 6-digit codes, false otherwise.
   */
  readonly groupSeparator = input<boolean | 'auto'>('auto');

  readonly valueChange = output<string>();
  readonly complete = output<string>();

  protected readonly id = `app-otp-input-${++nextId}`;
  protected readonly cells = viewChildren(OtpCell);

  // Internal working state, seeded from `value` input.
  protected readonly code = signal<string>('');

  protected readonly hasError = computed(() => !!this.error());

  protected readonly indices = computed(() =>
    Array.from({ length: this.digits() }, (_, i) => i),
  );

  protected readonly showSeparator = computed(() => {
    const sep = this.groupSeparator();
    if (sep === 'auto') return this.digits() === 6;
    return sep;
  });

  /** Index where the visual separator sits (between two halves). */
  protected readonly separatorAfter = computed(() => Math.floor(this.digits() / 2) - 1);

  protected readonly rootClass = computed(() =>
    [
      'otp-input',
      `otp-input--${this.size()}`,
      this.hasError() ? 'is-error' : '',
      this.disabled() ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  constructor() {
    effect(() => {
      const incoming = (this.value() ?? '').slice(0, this.digits());
      // Only sync if it differs from internal state — avoids tight feedback
      // loops when parents two-way bind via valueChange.
      if (incoming !== this.code()) {
        this.code.set(incoming);
      }
    });
  }

  protected cellValue(index: number): string {
    return this.code()[index] ?? '';
  }

  protected onCellChange(index: number, raw: string) {
    // Cell's own maxlength=1 already caps to one char, but be defensive.
    const char = (raw ?? '').slice(-1);
    const arr = this.toArray();
    arr[index] = char;
    const next = this.fromArray(arr);
    if (next === this.code()) return;
    this.code.set(next);
    this.valueChange.emit(next);

    if (char) this.focusCell(index + 1);

    if (next.length === this.digits() && !this.toArray(next).includes('')) {
      this.complete.emit(next);
    }
  }

  protected onCellKeyDown(index: number, event: KeyboardEvent) {
    if (this.disabled()) return;

    switch (event.key) {
      case 'Backspace': {
        // If the cell is empty, jump back; the previous cell's content is
        // intact so the user can immediately edit it.
        if (!this.cellValue(index)) {
          event.preventDefault();
          this.focusCell(index - 1);
        }
        // Otherwise the native input handles the delete; valueChange will fire.
        break;
      }
      case 'ArrowLeft':
        event.preventDefault();
        this.focusCell(index - 1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.focusCell(index + 1);
        break;
      case 'Home':
        event.preventDefault();
        this.focusCell(0);
        break;
      case 'End':
        event.preventDefault();
        this.focusCell(this.digits() - 1);
        break;
    }
  }

  protected onPaste(event: ClipboardEvent) {
    if (this.disabled()) return;
    const pasted = event.clipboardData?.getData('text') ?? '';
    const sanitized = pasted.replace(/[^\w]/g, '').slice(0, this.digits());
    if (!sanitized) return;
    event.preventDefault();

    // Start at currently-focused cell if one of ours has focus, else 0.
    const focusedIndex = this.cells().findIndex(
      (cell, i) =>
        document.activeElement ===
        (cell as unknown as { inputRef?: () => { nativeElement: HTMLElement } }).inputRef?.()
          .nativeElement,
    );
    const start = focusedIndex >= 0 ? focusedIndex : 0;

    const arr = this.toArray();
    for (let i = 0; i < sanitized.length && start + i < this.digits(); i++) {
      arr[start + i] = sanitized[i];
    }
    const next = this.fromArray(arr);
    this.code.set(next);
    this.valueChange.emit(next);

    const nextEmpty = arr.findIndex((c) => !c);
    this.focusCell(nextEmpty >= 0 ? nextEmpty : this.digits() - 1);

    if (next.length === this.digits() && !this.toArray(next).includes('')) {
      this.complete.emit(next);
    }
  }

  /** Programmatically focus a cell. Clamps to valid range; no-op on disabled. */
  focusCell(index: number) {
    if (this.disabled()) return;
    const list = this.cells();
    if (!list.length) return;
    const i = Math.max(0, Math.min(index, list.length - 1));
    list[i].focus();
    list[i].select();
  }

  /** Reset the code and focus the first cell. */
  clear() {
    this.code.set('');
    this.valueChange.emit('');
    this.focusCell(0);
  }

  // -------------------------------------------------------------------------
  // helpers — convert between the raw string and a fixed-length array
  // -------------------------------------------------------------------------
  private toArray(source = this.code()): string[] {
    const n = this.digits();
    const arr: string[] = new Array(n).fill('');
    for (let i = 0; i < Math.min(source.length, n); i++) {
      arr[i] = source[i];
    }
    return arr;
  }

  private fromArray(arr: string[]): string {
    // Trim trailing empties so length === number of filled cells.
    let end = arr.length;
    while (end > 0 && !arr[end - 1]) end--;
    return arr.slice(0, end).join('');
  }
}
