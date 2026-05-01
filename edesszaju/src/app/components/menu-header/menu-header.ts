import { Component, computed, input, output } from '@angular/core';
import { Icon } from '../icon/icon';

export type MenuHeaderType = 'avatar' | 'heading' | 'subheading' | 'search';
export type MenuHeaderStatus = 'online' | 'offline' | 'busy' | 'away';

@Component({
  selector: 'app-menu-header',
  imports: [Icon],
  templateUrl: './menu-header.html',
  styleUrl: './menu-header.scss',
})
export class MenuHeader {
  readonly type = input<MenuHeaderType>('heading');

  // Avatar variant
  readonly avatarUrl = input<string | null>(null);
  readonly avatarAlt = input<string>('');
  readonly status = input<MenuHeaderStatus | null>(null);

  // Avatar + heading variants share a primary/secondary text block
  readonly title = input<string>('');
  readonly subtitle = input<string | null>(null);

  // Search variant
  readonly placeholder = input<string>('Keresés');
  readonly value = input<string>('');

  readonly searchChange = output<string>();
  readonly searchSubmit = output<string>();

  protected readonly rootClass = computed(
    () => `menu-header menu-header--${this.type()}`,
  );

  protected onInput(event: Event) {
    const v = (event.target as HTMLInputElement).value;
    this.searchChange.emit(v);
  }

  protected onSubmit(event: SubmitEvent) {
    event.preventDefault();
    const input = (event.target as HTMLFormElement).querySelector(
      'input',
    ) as HTMLInputElement | null;
    this.searchSubmit.emit(input?.value ?? '');
  }
}
