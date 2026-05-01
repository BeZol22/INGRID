import { Component, computed, input } from '@angular/core';

export type ContentDividerVariant =
  | 'single-line'
  | 'dual-line'
  | 'background-fill';

@Component({
  selector: 'app-content-divider',
  templateUrl: './content-divider.html',
  styleUrl: './content-divider.scss',
})
export class ContentDivider {
  readonly variant = input<ContentDividerVariant>('single-line');
  readonly ariaLabel = input<string | null>(null);

  protected readonly rootClass = computed(
    () => `content-divider content-divider--${this.variant()}`,
  );
}
