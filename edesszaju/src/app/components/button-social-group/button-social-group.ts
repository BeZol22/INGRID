import { Component, computed, input, output } from '@angular/core';
import {
  ButtonSocial,
  SocialBrand,
  SocialSize,
  SocialTheme,
} from '../button-social/button-social';

export type SocialGroupLayout = 'stack' | 'row';

export interface SocialClickEvent {
  social: SocialBrand;
  event: MouseEvent;
}

@Component({
  selector: 'app-button-social-group',
  imports: [ButtonSocial],
  templateUrl: './button-social-group.html',
  styleUrl: './button-social-group.scss',
})
export class ButtonSocialGroup {
  readonly size = input<SocialSize>('md');
  readonly layout = input<SocialGroupLayout>('stack');
  readonly theme = input<SocialTheme>('brand');
  readonly socials = input<readonly SocialBrand[]>([
    'google',
    'facebook',
    'apple',
  ]);
  readonly disabled = input(false, { transform: Boolean });

  readonly socialClicked = output<SocialClickEvent>();

  protected readonly rootClass = computed(
    () => `social-group social-group--${this.layout()} social-group--${this.size()}`,
  );

  protected readonly iconOnly = computed(() => this.layout() === 'row');

  protected onClick(social: SocialBrand, event: MouseEvent) {
    this.socialClicked.emit({ social, event });
  }
}
