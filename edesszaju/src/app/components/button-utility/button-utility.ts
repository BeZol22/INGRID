import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon, IconName } from '../icon/icon';

export type ButtonUtilityHierarchy = 'secondary' | 'tertiary';
export type ButtonUtilitySize = 'xs' | 'sm';
export type ButtonUtilityType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button-utility',
  imports: [Icon, RouterLink],
  templateUrl: './button-utility.html',
  styleUrl: './button-utility.scss',
})
export class ButtonUtility {
  readonly icon = input.required<IconName>();
  readonly label = input.required<string>();
  readonly hierarchy = input<ButtonUtilityHierarchy>('secondary');
  readonly size = input<ButtonUtilitySize>('xs');
  readonly disabled = input(false, { transform: Boolean });
  readonly type = input<ButtonUtilityType>('button');
  readonly showTooltip = input(true, { transform: Boolean });

  readonly routerLink = input<string | unknown[] | null>(null);
  readonly href = input<string | null>(null);
  readonly target = input<string | null>(null);
  readonly rel = input<string | null>(null);

  readonly clicked = output<MouseEvent>();

  protected readonly rootClass = computed(() =>
    [
      'btn-util',
      `btn-util--${this.hierarchy()}`,
      `btn-util--${this.size()}`,
      this.disabled() ? 'is-disabled' : '',
      this.showTooltip() ? 'has-tooltip' : '',
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
