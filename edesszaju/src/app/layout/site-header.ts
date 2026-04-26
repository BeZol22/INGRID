import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'site-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  protected readonly open = signal(false);

  constructor(protected readonly auth: AuthService) {}

  toggleMenu() {
    this.open.update((v) => !v);
  }

  closeMenu() {
    this.open.set(false);
  }
}
