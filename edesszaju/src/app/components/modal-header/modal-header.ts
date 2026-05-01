import { Component, computed, input, output } from '@angular/core';
import { ButtonClose } from '../button-close/button-close';
import { Icon, IconName } from '../icon/icon';

export type ModalHeaderAlignment = 'left' | 'center' | 'horizontal';

@Component({
  selector: 'app-modal-header',
  imports: [ButtonClose, Icon],
  templateUrl: './modal-header.html',
  styleUrl: './modal-header.scss',
})
export class ModalHeader {
  readonly title = input<string>('');
  readonly description = input<string | null>(null);
  /** Built-in featured-icon chip uses this icon name. */
  readonly featuredIcon = input<IconName | null>(null);
  readonly alignment = input<ModalHeaderAlignment>('left');
  readonly closable = input(true, { transform: Boolean });
  readonly divider = input(false, { transform: Boolean });
  /** When true (and divider is shown OR alignment requires it), reserves 20px below the text. */
  readonly paddingBottom = input(true, { transform: Boolean });
  readonly closeAriaLabel = input<string>('Bezárás');

  readonly closed = output<void>();

  protected readonly hasFeaturedIcon = computed(() => !!this.featuredIcon());

  protected readonly rootClass = computed(() =>
    [
      'modal-header',
      `modal-header--${this.alignment()}`,
      this.hasFeaturedIcon() ? 'modal-header--has-icon' : '',
      this.divider() ? 'modal-header--divider' : '',
      this.paddingBottom() ? 'modal-header--pad-bottom' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onClose() {
    this.closed.emit();
  }
}
