import { Component, computed, input, signal } from '@angular/core';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipAlign = 'start' | 'center' | 'end';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
})
export class Tooltip {
  readonly text = input.required<string>();
  readonly supportingText = input<string | null>(null);
  readonly placement = input<TooltipPlacement>('top');
  readonly align = input<TooltipAlign>('center');
  readonly disabled = input(false, { transform: Boolean });
  readonly delay = input<number>(150);
  readonly arrow = input(true, { transform: Boolean });

  protected readonly isOpen = signal(false);
  private openTimer: ReturnType<typeof setTimeout> | null = null;

  protected readonly rootClass = computed(() =>
    [
      'tooltip',
      `tooltip--${this.placement()}`,
      `tooltip--align-${this.align()}`,
      this.supportingText() ? 'tooltip--has-supporting' : '',
      this.arrow() ? 'tooltip--has-arrow' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onEnter() {
    if (this.disabled()) return;
    this.clearTimer();
    this.openTimer = setTimeout(() => this.isOpen.set(true), this.delay());
  }

  protected onLeave() {
    this.clearTimer();
    this.isOpen.set(false);
  }

  private clearTimer() {
    if (this.openTimer) {
      clearTimeout(this.openTimer);
      this.openTimer = null;
    }
  }
}
