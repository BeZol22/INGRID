import { Component, computed, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Icon, IconName } from '../icon/icon';
import { MenuIcon } from '../menu-icon/menu-icon';

export type MenuItemType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-menu-item',
  imports: [Icon, MenuIcon, RouterLink, NgTemplateOutlet],
  templateUrl: './menu-item.html',
  styleUrl: './menu-item.scss',
})
export class MenuItem {
  readonly label = input<string>('');
  readonly icon = input<IconName | null>(null);
  readonly shortcut = input<string | null>(null);
  readonly chevron = input(false, { transform: Boolean });
  readonly divider = input(false, { transform: Boolean });
  readonly active = input(false, { transform: Boolean });
  readonly disabled = input(false, { transform: Boolean });
  readonly type = input<MenuItemType>('button');
  readonly ariaLabel = input<string | null>(null);

  readonly routerLink = input<string | unknown[] | null>(null);
  readonly href = input<string | null>(null);
  readonly target = input<string | null>(null);
  readonly rel = input<string | null>(null);

  readonly clicked = output<MouseEvent>();

  protected readonly rootClass = computed(() =>
    [
      'menu-item',
      this.active() ? 'is-active' : '',
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
