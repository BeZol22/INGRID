import { Component, computed, input, output } from '@angular/core';
import { Avatar } from '../avatar/avatar';
import { Button } from '../button/button';
import { ButtonUtility } from '../button-utility/button-utility';

export type NavActionsBreakpoint = 'desktop' | 'mobile';

@Component({
  selector: 'app-nav-actions',
  imports: [Avatar, Button, ButtonUtility],
  templateUrl: './nav-actions.html',
  styleUrl: './nav-actions.scss',
})
export class NavActions {
  readonly loggedIn = input(false, { transform: Boolean });
  readonly breakpoint = input<NavActionsBreakpoint>('desktop');

  readonly avatarSrc = input<string | null>(null);
  readonly userName = input<string>('');
  readonly userEmail = input<string | null>(null);

  readonly loginLabel = input<string>('Log in');
  readonly signupLabel = input<string>('Sign up');
  readonly loginRouterLink = input<string | unknown[] | null>(null);
  readonly signupRouterLink = input<string | unknown[] | null>(null);

  readonly loginClicked = output<MouseEvent>();
  readonly signupClicked = output<MouseEvent>();
  readonly accountClicked = output<MouseEvent>();
  readonly logoutClicked = output<MouseEvent>();

  protected readonly isMobile = computed(() => this.breakpoint() === 'mobile');

  protected readonly rootClass = computed(() =>
    [
      'nav-actions',
      `nav-actions--${this.breakpoint()}`,
      this.loggedIn() ? 'nav-actions--logged-in' : 'nav-actions--logged-out',
    ].join(' '),
  );

  protected onLogin(event: MouseEvent) {
    this.loginClicked.emit(event);
  }

  protected onSignup(event: MouseEvent) {
    this.signupClicked.emit(event);
  }

  protected onAccount(event: MouseEvent) {
    this.accountClicked.emit(event);
  }

  protected onLogout(event: MouseEvent) {
    this.logoutClicked.emit(event);
  }
}
