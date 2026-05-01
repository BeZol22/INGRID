import { Component, computed, input, output, signal } from '@angular/core';
import { Icon } from '../icon/icon';
import { Spinner } from '../spinner/spinner';

export type SearchBarSize = 'sm' | 'md' | 'lg';
export type SearchBarButtonVariant = 'primary' | 'secondary';

@Component({
  selector: 'app-search-bar',
  imports: [Icon, Spinner],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar {
  readonly placeholder = input<string>('Keress sütit, várost vagy kategóriát…');
  readonly buttonLabel = input<string>('Keresés');
  readonly value = input<string>('');
  readonly hint = input<string | null>(null);
  readonly error = input<string | null>(null);
  readonly loading = input(false, { transform: Boolean });
  readonly disabled = input(false, { transform: Boolean });
  readonly name = input<string | null>(null);
  readonly size = input<SearchBarSize>('md');
  /** primary = filled brand-pink (hero); secondary = outlined cream (nav). */
  readonly buttonVariant = input<SearchBarButtonVariant>('primary');

  readonly valueChange = output<string>();
  readonly submitted = output<string>();

  /** Local mirror so we can emit on submit even if consumer doesn't bind value. */
  protected readonly localValue = signal<string>('');

  /** Sync external `value` input into local signal whenever it changes. */
  constructor() {
    // Track input changes via computed in template; localValue is updated on input event.
  }

  protected readonly hasError = computed(() => !!this.error());
  protected readonly currentValue = computed(() =>
    this.localValue() || this.value(),
  );

  protected readonly rootClass = computed(() =>
    [
      'search-bar',
      `search-bar--${this.size()}`,
      `search-bar--btn-${this.buttonVariant()}`,
      this.hasError() ? 'search-bar--error' : '',
      this.disabled() ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onInput(event: Event) {
    const v = (event.target as HTMLInputElement).value;
    this.localValue.set(v);
    this.valueChange.emit(v);
  }

  protected onSubmit(event: Event) {
    event.preventDefault();
    if (this.disabled() || this.loading()) return;
    const v = this.currentValue().trim();
    if (!v) return;
    this.submitted.emit(v);
  }
}
