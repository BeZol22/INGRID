import {
  Component,
  ElementRef,
  computed,
  input,
  output,
  viewChild,
} from '@angular/core';

export type TextareaSize = 'sm' | 'md';
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

let nextId = 0;

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.html',
  styleUrl: './textarea.scss',
})
export class Textarea {
  readonly size = input<TextareaSize>('md');
  readonly value = input<string>('');
  readonly placeholder = input<string>('');
  readonly disabled = input(false, { transform: Boolean });
  readonly required = input(false, { transform: Boolean });
  readonly readonly = input(false, { transform: Boolean });

  readonly label = input<string | null>(null);
  readonly hint = input<string | null>(null);
  readonly error = input<string | null>(null);

  readonly rows = input<number>(4);
  readonly resize = input<TextareaResize>('vertical');
  readonly maxLength = input<number | null>(null);
  readonly minLength = input<number | null>(null);

  readonly inputId = input<string | null>(null);
  readonly name = input<string | null>(null);
  readonly autocomplete = input<string | null>(null);

  readonly valueChange = output<string>();
  readonly focused = output<FocusEvent>();
  readonly blurred = output<FocusEvent>();

  protected readonly autoId = `app-textarea-${++nextId}`;
  private readonly textareaRef =
    viewChild.required<ElementRef<HTMLTextAreaElement>>('textarea');

  protected readonly resolvedId = computed(() => this.inputId() ?? this.autoId);
  protected readonly hasError = computed(() => !!this.error());

  protected readonly rootClass = computed(() =>
    [
      'textarea',
      `textarea--${this.size()}`,
      `textarea--resize-${this.resize()}`,
      this.hasError() ? 'is-error' : '',
      this.disabled() ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onInput(event: Event) {
    const v = (event.target as HTMLTextAreaElement).value;
    this.valueChange.emit(v);
  }

  protected onFocus(event: FocusEvent) {
    this.focused.emit(event);
  }

  protected onBlur(event: FocusEvent) {
    this.blurred.emit(event);
  }

  /** Programmatically focus the textarea. */
  focus() {
    this.textareaRef().nativeElement.focus();
  }

  /** Programmatically select the textarea contents. */
  select() {
    this.textareaRef().nativeElement.select();
  }
}
