import { Component, computed, input, output } from '@angular/core';
import { ButtonClose } from '../button-close/button-close';

export type ToastVariant =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

@Component({
  selector: 'app-toast',
  imports: [ButtonClose],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast {
  readonly title = input<string>('');
  readonly description = input<string | null>(null);
  readonly variant = input<ToastVariant>('neutral');
  /** When true (and variant is not neutral), an alert circle icon is rendered. */
  readonly showAlertIcon = input(true, { transform: Boolean });

  readonly closable = input(true, { transform: Boolean });
  readonly dismissLabel = input<string | null>('Dismiss');
  readonly actionLabel = input<string | null>(null);

  /** 0–100 — when non-null, renders a progress bar with the given percentage. */
  readonly progress = input<number | null>(null);

  readonly closed = output<void>();
  readonly dismissed = output<void>();
  readonly actionClicked = output<void>();

  protected readonly hasAlertIcon = computed(
    () => this.variant() !== 'neutral' && this.showAlertIcon(),
  );

  protected readonly hasFooter = computed(
    () => !!this.dismissLabel() || !!this.actionLabel(),
  );

  protected readonly progressClamped = computed(() => {
    const p = this.progress();
    if (p === null) return null;
    return Math.max(0, Math.min(100, p));
  });

  protected readonly rootClass = computed(
    () => `toast toast--${this.variant()}`,
  );

  protected onClose() {
    this.closed.emit();
  }

  protected onDismiss() {
    this.dismissed.emit();
  }

  protected onAction() {
    this.actionClicked.emit();
  }
}
