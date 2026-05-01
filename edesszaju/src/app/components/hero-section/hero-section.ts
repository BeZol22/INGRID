import { Component, computed, input } from '@angular/core';

export type HeroSectionTheme = 'default' | 'brand';
export type HeroSectionAlign = 'center' | 'left';
export type HeroSectionLayout = 'stacked' | 'split';
export type HeroSectionMaxWidth = 'md' | 'lg' | 'xl' | '2xl';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection {
  readonly theme = input<HeroSectionTheme>('default');
  readonly align = input<HeroSectionAlign>('left');
  /**
   * stacked — content top, trailing media (image/mockup) below
   * split   — content + trailing media side by side (50/50)
   */
  readonly layout = input<HeroSectionLayout>('stacked');
  readonly maxWidth = input<HeroSectionMaxWidth>('xl');

  protected readonly rootClass = computed(() =>
    [
      'hero-section',
      `hero-section--theme-${this.theme()}`,
      `hero-section--align-${this.align()}`,
      `hero-section--layout-${this.layout()}`,
      `hero-section--max-${this.maxWidth()}`,
    ].join(' '),
  );
}
