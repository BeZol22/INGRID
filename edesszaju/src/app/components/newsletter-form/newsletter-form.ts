import { Component, computed, input, output, signal } from '@angular/core';
import { Button } from '../button/button';
import { Input as AppInput } from '../input/input';

export type NewsletterFormLayout = 'inline' | 'stacked';
export type NewsletterFormSize = 'md' | 'lg';

@Component({
  selector: 'app-newsletter-form',
  imports: [Button, AppInput],
  templateUrl: './newsletter-form.html',
  styleUrl: './newsletter-form.scss',
})
export class NewsletterForm {
  readonly placeholder = input<string>('Enter your email');
  readonly buttonLabel = input<string>('Subscribe');
  /** Helper text under the form — typically a privacy disclaimer. */
  readonly helperText = input<string | null>(null);
  readonly size = input<NewsletterFormSize>('md');
  /** inline = input + button side-by-side; stacked = button below input. */
  readonly layout = input<NewsletterFormLayout>('inline');
  readonly disabled = input(false, { transform: Boolean });
  readonly loading = input(false, { transform: Boolean });

  readonly submitted = output<string>();
  readonly valueChange = output<string>();

  /** Local mirror of the email field so we can emit on submit. */
  protected readonly value = signal('');

  protected readonly rootClass = computed(() =>
    [
      'newsletter-form',
      `newsletter-form--${this.layout()}`,
      `newsletter-form--${this.size()}`,
    ].join(' '),
  );

  protected onInput(value: string) {
    this.value.set(value);
    this.valueChange.emit(value);
  }

  protected onSubmit(event: Event) {
    event.preventDefault();
    if (this.disabled() || this.loading()) return;
    const v = this.value().trim();
    if (!v) return;
    this.submitted.emit(v);
  }
}
