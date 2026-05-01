import { Component, computed, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

export type SocialBrand =
  | 'google'
  | 'facebook'
  | 'apple'
  | 'twitter'
  | 'figma'
  | 'dribbble';
export type SocialTheme = 'brand' | 'color' | 'gray';
export type SocialSize = 'md' | 'lg';
export type SocialButtonType = 'button' | 'submit' | 'reset';

const DEFAULT_LABELS: Record<SocialBrand, string> = {
  google: 'Sign in with Google',
  facebook: 'Sign in with Facebook',
  apple: 'Sign in with Apple',
  twitter: 'Sign in with X',
  figma: 'Sign in with Figma',
  dribbble: 'Sign in with Dribbble',
};

@Component({
  selector: 'app-button-social',
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './button-social.html',
  styleUrl: './button-social.scss',
})
export class ButtonSocial {
  readonly social = input.required<SocialBrand>();
  readonly theme = input<SocialTheme>('brand');
  readonly size = input<SocialSize>('md');
  readonly iconOnly = input(false, { transform: Boolean });
  readonly fullWidth = input(false, { transform: Boolean });
  readonly disabled = input(false, { transform: Boolean });
  readonly type = input<SocialButtonType>('button');
  readonly label = input<string | null>(null);
  readonly ariaLabel = input<string | null>(null);

  readonly routerLink = input<string | unknown[] | null>(null);
  readonly href = input<string | null>(null);
  readonly target = input<string | null>(null);
  readonly rel = input<string | null>(null);

  readonly clicked = output<MouseEvent>();

  protected readonly resolvedLabel = computed(
    () => this.label() ?? DEFAULT_LABELS[this.social()],
  );

  protected readonly resolvedAriaLabel = computed(
    () => this.ariaLabel() ?? this.resolvedLabel(),
  );

  protected readonly rootClass = computed(() =>
    [
      'btn-social',
      `btn-social--${this.size()}`,
      `btn-social--theme-${this.theme()}`,
      `btn-social--social-${this.social()}`,
      this.iconOnly() ? 'btn-social--icon-only' : '',
      this.fullWidth() ? 'btn-social--full' : '',
      this.disabled() ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onClick(event: MouseEvent) {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.clicked.emit(event);
  }
}
