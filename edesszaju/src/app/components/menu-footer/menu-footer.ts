import { Component, computed, input, output } from '@angular/core';
import { Button } from '../button/button';
import { IconName } from '../icon/icon';

export type MenuFooterType = 'text' | 'button';
export type MenuFooterButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-menu-footer',
  imports: [Button],
  templateUrl: './menu-footer.html',
  styleUrl: './menu-footer.scss',
})
export class MenuFooter {
  readonly type = input<MenuFooterType>('button');

  // button variant
  readonly label = input<string>('Sign out');
  readonly icon = input<IconName | null>(null);
  readonly disabled = input(false, { transform: Boolean });
  readonly buttonType = input<MenuFooterButtonType>('button');
  readonly routerLink = input<string | unknown[] | null>(null);
  readonly href = input<string | null>(null);
  readonly target = input<string | null>(null);
  readonly rel = input<string | null>(null);

  // text variant
  readonly leftText = input<string | null>(null);
  readonly rightText = input<string | null>(null);

  readonly clicked = output<MouseEvent>();

  protected readonly rootClass = computed(
    () => `menu-footer menu-footer--${this.type()}`,
  );

  protected onButtonClick(event: MouseEvent) {
    this.clicked.emit(event);
  }
}
