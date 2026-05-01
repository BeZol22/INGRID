import { Component, computed, input } from '@angular/core';
import { StepIcon, StepIconStatus, StepIconType } from '../step-icon/step-icon';

export type StepProgressSize = 'sm' | 'md';
export type StepProgressType = StepIconType; // 'check' | 'number'

interface ProgressDot {
  index: number;          // 1-based
  status: StepIconStatus;
}

@Component({
  selector: 'app-step-progress',
  imports: [StepIcon],
  templateUrl: './step-progress.html',
  styleUrl: './step-progress.scss',
})
export class StepProgress {
  readonly size = input<StepProgressSize>('sm');
  readonly type = input<StepProgressType>('check');
  readonly current = input(1, { transform: (v: unknown) => Math.max(1, Number(v) || 1) });
  readonly total = input(1, { transform: (v: unknown) => Math.max(1, Number(v) || 1) });
  readonly showText = input(true, { transform: Boolean });
  /** Template with `{current}` and `{total}` placeholders. */
  readonly textTemplate = input<string>('Step {current} of {total}');
  /** Draw lines between dots — solid pink after a complete step, dashed gray otherwise. */
  readonly connector = input(false, { transform: Boolean });

  protected readonly clampedCurrent = computed(() =>
    Math.min(this.current(), this.total()),
  );

  protected readonly dots = computed<ProgressDot[]>(() => {
    const total = this.total();
    const current = this.clampedCurrent();
    return Array.from({ length: total }, (_, i) => {
      const index = i + 1;
      let status: StepIconStatus = 'incomplete';
      if (index < current) status = 'complete';
      else if (index === current) status = 'current';
      return { index, status };
    });
  });

  protected readonly labelText = computed(() =>
    this.textTemplate()
      .replace('{current}', String(this.clampedCurrent()))
      .replace('{total}', String(this.total())),
  );

  protected readonly rootClass = computed(() =>
    [
      'step-progress',
      `step-progress--${this.size()}`,
      `step-progress--${this.type()}`,
      this.showText() ? 'step-progress--with-text' : '',
      this.connector() ? 'step-progress--connected' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );
}
