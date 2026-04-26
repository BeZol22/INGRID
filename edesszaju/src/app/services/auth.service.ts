import { Injectable, computed, effect, signal } from '@angular/core';

const AUTH_KEY = 'edesszaju.auth.v1';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'edes123';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _user = signal<string | null>(this.load());

  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => this._user() !== null);

  constructor() {
    effect(() => {
      const u = this._user();
      try {
        if (u) localStorage.setItem(AUTH_KEY, u);
        else localStorage.removeItem(AUTH_KEY);
      } catch {
        /* ignore */
      }
    });
  }

  login(username: string, password: string): boolean {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      this._user.set(username);
      return true;
    }
    return false;
  }

  logout(): void {
    this._user.set(null);
  }

  private load(): string | null {
    try {
      return localStorage.getItem(AUTH_KEY);
    } catch {
      return null;
    }
  }
}
