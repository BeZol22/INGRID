import { Component, computed, input } from '@angular/core';

export type StepIconSize = 'sm' | 'md';
export type StepIconType = 'check' | 'number';
export type StepIconStatus = 'incomplete' | 'current' | 'complete';

@Component({
  selector: 'app-step-icon',
  templateUrl: './step-icon.html',
  styleUrl: './step-icon.scss',
})
export class StepIcon {
  readonly size = input<StepIconSize>('sm');
  readonly type = input<StepIconType>('check');
  readonly status = input<StepIconStatus>('incomplete');
  /** Number to display when type === 'number'. */
  readonly step = input<number>(1);

  protected readonly isCheck = computed(() => this.type() === 'check');
  protected readonly isComplete = computed(() => this.status() === 'complete');
  protected readonly showInnerDot = computed(
    () => this.isCheck() && this.status() !== 'complete',
  );
  protected readonly showNumber = computed(
    () => !this.isCheck() && this.status() !== 'complete',
  );

  protected readonly rootClass = computed(() =>
    [
      'step-icon',
      `step-icon--${this.size()}`,
      `step-icon--${this.type()}`,
      `step-icon--${this.status()}`,
    ].join(' '),
  );
}
