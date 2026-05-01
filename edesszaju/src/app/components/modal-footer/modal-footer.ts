import { Component, computed, input } from '@angular/core';

export type ModalFooterLayout =
  | 'horizontal-fill'
  | 'vertical-fill'
  | 'horizontal-right';

@Component({
  selector: 'app-modal-footer',
  templateUrl: './modal-footer.html',
  styleUrl: './modal-footer.scss',
})
export class ModalFooter {
  /**
   * horizontal-fill  — buttons side-by-side, each fills half the row
   * vertical-fill    — buttons stacked vertically, each fills the row
   * horizontal-right — leading slot on the left (checkbox / tertiary), action
   *                    buttons right-aligned
   */
  readonly layout = input<ModalFooterLayout>('horizontal-fill');
  readonly divider = input(true, { transform: Boolean });

  protected readonly rootClass = computed(() =>
    [
      'modal-footer',
      `modal-footer--${this.layout()}`,
      this.divider() ? 'modal-footer--divider' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );
}
