import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Icon } from '../../../components/icon/icon';
import { Button } from '../../../components/button/button';

@Component({
  selector: 'page-admin-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Icon, Button],
  templateUrl: './admin-shell.html',
  styleUrl: './admin-shell.scss',
})
export class AdminShell {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
