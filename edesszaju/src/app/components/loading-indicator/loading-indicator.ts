import { Component, computed, input } from '@angular/core';

export type LoadingIndicatorSize = 'sm' | 'md' | 'lg' | 'xl';
export type LoadingIndicatorVariant =
  | 'line-simple'
  | 'line-spinner'
  | 'dot-circle';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.html',
  styleUrl: './loading-indicator.scss',
})
export class LoadingIndicator {
  readonly size = input<LoadingIndicatorSize>('md');
  readonly variant = input<LoadingIndicatorVariant>('line-simple');
  readonly text = input<string | null>('Betöltés…');
  readonly ariaLabel = input<string | null>(null);

  protected readonly resolvedAriaLabel = computed(
    () => this.ariaLabel() ?? this.text() ?? 'Betöltés',
  );

  protected readonly rootClass = computed(
    () =>
      `loading-indicator loading-indicator--${this.size()} loading-indicator--${this.variant()}`,
  );

  /** 12 evenly-spaced dot positions for the dot-circle variant. */
  protected readonly dots = Array.from({ length: 12 }, (_, i) => i);
}
