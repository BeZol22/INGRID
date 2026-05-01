import { Component, computed, input } from '@angular/core';

export type FooterTheme = 'default' | 'brand';
export type FooterSize = 'small' | 'large';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly theme = input<FooterTheme>('default');
  readonly size = input<FooterSize>('large');

  protected readonly rootClass = computed(() =>
    [
      'footer',
      `footer--theme-${this.theme()}`,
      `footer--${this.size()}`,
    ].join(' '),
  );
}
