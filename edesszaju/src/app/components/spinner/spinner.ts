import { Component, computed, input } from '@angular/core';

export type SpinnerSize = 'sm' | 'md';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
})
export class Spinner {
  readonly size = input<SpinnerSize>('sm');
  readonly ariaLabel = input<string>('Betöltés');

  protected readonly rootClass = computed(
    () => `spinner spinner--${this.size()}`,
  );
}
