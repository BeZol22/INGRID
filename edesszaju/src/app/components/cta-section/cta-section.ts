import { Component, computed, input } from '@angular/core';

export type CtaSectionTheme = 'default' | 'brand';
export type CtaSectionAlign = 'center' | 'left';
export type CtaSectionMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  selector: 'app-cta-section',
  templateUrl: './cta-section.html',
  styleUrl: './cta-section.scss',
})
export class CtaSection {
  readonly theme = input<CtaSectionTheme>('default');
  readonly align = input<CtaSectionAlign>('center');
  readonly maxWidth = input<CtaSectionMaxWidth>('xl');
  /** When true, wraps the content in a rounded card with the page background. */
  readonly card = input(false, { transform: Boolean });

  protected readonly rootClass = computed(() =>
    [
      'cta-section',
      `cta-section--theme-${this.theme()}`,
      `cta-section--align-${this.align()}`,
      `cta-section--max-${this.maxWidth()}`,
      this.card() ? 'cta-section--card' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );
}
