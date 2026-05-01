import { Component, computed, input } from '@angular/core';
import { Icon, IconName } from '../icon/icon';
import { StepIcon } from '../step-icon/step-icon';

export type StepStatus = 'incomplete' | 'current' | 'complete';
export type StepSize = 'sm' | 'md';
export type StepLayout = 'horizontal' | 'vertical';
export type StepVariant = 'icon' | 'number' | 'featured' | 'text-line';

@Component({
  selector: 'app-step',
  imports: [Icon, StepIcon],
  templateUrl: './step.html',
  styleUrl: './step.scss',
})
export class Step {
  readonly variant = input<StepVariant>('icon');
  readonly status = input<StepStatus>('incomplete');
  readonly size = input<StepSize>('sm');
  readonly layout = input<StepLayout>('horizontal');
  readonly connector = input(true, { transform: Boolean });

  readonly title = input<string>('');
  readonly supportingText = input<string | null>(null);
  /** Number to render when variant === 'number'. */
  readonly step = input<number>(1);
  /** Override icon for variant === 'featured'. Defaults to user-01. */
  readonly icon = input<IconName>('user-01');

  protected readonly isFeatured = computed(() => this.variant() === 'featured');
  protected readonly isTextLine = computed(() => this.variant() === 'text-line');
  protected readonly isHorizontal = computed(() => this.layout() === 'horizontal');

  protected readonly stepIconType = computed<'check' | 'number'>(() =>
    this.variant() === 'number' ? 'number' : 'check',
  );

  protected readonly showConnector = computed(
    () => this.connector() && this.isHorizontal() && !this.isTextLine(),
  );

  protected readonly rootClass = computed(() =>
    [
      'step',
      `step--${this.variant()}`,
      `step--${this.status()}`,
      `step--${this.size()}`,
      this.isHorizontal() ? 'step--horizontal' : 'step--vertical',
      this.showConnector() ? 'step--has-connector' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );
}
