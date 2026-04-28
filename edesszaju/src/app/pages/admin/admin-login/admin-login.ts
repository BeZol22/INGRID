import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Icon } from '../../../components/icon';

@Component({
  selector: 'page-admin-login',
  imports: [RouterLink, Icon],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss',
})
export class AdminLoginPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly username = signal('admin');
  protected readonly password = signal('');
  protected readonly error = signal('');

  submit(e: Event) {
    e.preventDefault();
    this.error.set('');
    const ok = this.auth.login(this.username().trim(), this.password());
    if (ok) {
      this.router.navigateByUrl('/admin');
    } else {
      this.error.set('Hibás felhasználónév vagy jelszó.');
    }
  }

  protected asInput(e: Event): HTMLInputElement {
    return e.target as HTMLInputElement;
  }
}
