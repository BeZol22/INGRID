import { Component, computed, input } from '@angular/core';
import { Icon, IconName } from '../icon/icon';

export type MenuIconType =
  | 'spacer'
  | 'icon'
  | 'check'
  | 'checkbox'
  | 'dot'
  | 'avatar'
  | 'integration';

@Component({
  selector: 'app-menu-icon',
  imports: [Icon],
  templateUrl: './menu-icon.html',
  styleUrl: './menu-icon.scss',
})
export class MenuIcon {
  readonly type = input<MenuIconType>('spacer');
  readonly icon = input<IconName | null>(null);
  readonly imageUrl = input<string | null>(null);
  readonly imageAlt = input<string>('');
  readonly checked = input(false, { transform: Boolean });

  protected readonly rootClass = computed(
    () => `menu-icon menu-icon--${this.type()}`,
  );
}
