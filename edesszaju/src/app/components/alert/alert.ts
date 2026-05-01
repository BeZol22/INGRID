import { Component, computed, input, output } from '@angular/core';
import { Button } from '../button/button';
import { ButtonClose } from '../button-close/button-close';

export type AlertVariant =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';
export type AlertLayout = 'stacked' | 'inline';
export type AlertActions = 'links' | 'buttons';

@Component({
  selector: 'app-alert',
  imports: [Button, ButtonClose],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
})
export class Alert {
  readonly title = input<string>('');
  readonly description = input<string | null>(null);
  readonly variant = input<AlertVariant>('neutral');
  /**
   * stacked = title and description on separate lines (default)
   * inline  = title and description on the same row, actions pushed right
   */
  readonly layout = input<AlertLayout>('stacked');
  /**
   * links   = Dismiss / Action as inline text buttons (default)
   * buttons = Dismiss / Action as full <app-button> elements; in stacked
   *           layout they sit side-by-side or stack vertically depending on width
   */
  readonly actions = input<AlertActions>('links');

  readonly closable = input(true, { transform: Boolean });
  readonly showAlertIcon = input(true, { transform: Boolean });
  readonly dismissLabel = input<string | null>('Dismiss');
  readonly actionLabel = input<string | null>(null);

  readonly closed = output<void>();
  readonly dismissed = output<void>();
  readonly actionClicked = output<void>();

  protected readonly hasAlertIcon = computed(
    () => this.variant() !== 'neutral' && this.showAlertIcon(),
  );

  protected readonly hasFooter = computed(
    () => !!this.dismissLabel() || !!this.actionLabel(),
  );

  protected readonly rootClass = computed(() =>
    [
      'alert',
      `alert--${this.variant()}`,
      `alert--${this.layout()}`,
      `alert--actions-${this.actions()}`,
    ].join(' '),
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
