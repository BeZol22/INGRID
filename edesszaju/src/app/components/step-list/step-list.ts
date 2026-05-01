import { Component, computed, input } from '@angular/core';
import { IconName } from '../icon/icon';
import { Step, StepSize, StepStatus, StepVariant } from '../step/step';

export type StepListDirection = 'horizontal' | 'vertical';
/** All step variants are list-compatible — text-line steps simply use their own top border in lieu of a list-drawn connector. */
export type StepListVariant = StepVariant;

export interface StepListItem {
  title: string;
  description?: string | null;
  status: StepStatus;
  /** Override displayed number when variant === 'number'. Defaults to position. */
  step?: number;
  /** Override the user-01 glyph when variant === 'featured'. */
  icon?: IconName;
}

@Component({
  selector: 'app-step-list',
  imports: [Step],
  templateUrl: './step-list.html',
  styleUrl: './step-list.scss',
})
export class StepList {
  readonly direction = input<StepListDirection>('vertical');
  readonly size = input<StepSize>('sm');
  readonly variant = input<StepListVariant>('icon');
  readonly steps = input<StepListItem[]>([]);

  protected readonly isHorizontal = computed(() => this.direction() === 'horizontal');
  protected readonly isTextLine = computed(() => this.variant() === 'text-line');

  protected readonly rootClass = computed(() =>
    [
      'step-list',
      `step-list--${this.direction()}`,
      `step-list--${this.variant()}`,
      `step-list--${this.size()}`,
    ].join(' '),
  );

  /** Each step's child layout differs from the list's direction. */
  protected readonly childLayout = computed<'horizontal' | 'vertical'>(() =>
    this.isHorizontal() ? 'vertical' : 'horizontal',
  );

  /**
   * The colour of the connector after step `i` is owned by the step itself
   * (its own status). For the vertical direction we delegate to <app-step>'s
   * built-in connector. For horizontal we draw the connector ourselves between
   * adjacent items so it can sit at icon-centre.
   */
  protected connectorClassForStatus(status: StepStatus): string {
    if (status === 'complete' || status === 'current') {
      return 'step-list__connector--brand';
    }
    return 'step-list__connector--muted';
  }
}
