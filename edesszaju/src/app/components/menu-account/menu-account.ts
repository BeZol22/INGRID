import { Component, computed, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

export type MenuAccountType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-menu-account',
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './menu-account.html',
  styleUrl: './menu-account.scss',
})
export class MenuAccount {
  readonly avatarUrl = input<string | null>(null);
  readonly avatarAlt = input<string>('');
  readonly name = input<string>('');
  readonly email = input<string | null>(null);
  readonly selected = input(false, { transform: Boolean });
  readonly active = input(false, { transform: Boolean });
  readonly disabled = input(false, { transform: Boolean });
  readonly type = input<MenuAccountType>('button');
  readonly ariaLabel = input<string | null>(null);

  readonly routerLink = input<string | unknown[] | null>(null);
  readonly href = input<string | null>(null);
  readonly target = input<string | null>(null);
  readonly rel = input<string | null>(null);

  readonly clicked = output<MouseEvent>();

  protected readonly rootClass = computed(() =>
    [
      'menu-account',
      this.active() ? 'is-active' : '',
      this.selected() ? 'is-selected' : '',
      this.disabled() ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected readonly resolvedAriaLabel = computed(() => {
    const explicit = this.ariaLabel();
    if (explicit) return explicit;
    const e = this.email();
    return e ? `${this.name()} — ${e}` : this.name();
  });

  protected onClick(event: MouseEvent) {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.clicked.emit(event);
  }
}
