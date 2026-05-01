import { Component, computed, input } from '@angular/core';

export type RadioGroupDirection = 'vertical' | 'horizontal';

let nextId = 0;

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.html',
  styleUrl: './radio-group.scss',
})
export class RadioGroup {
  readonly label = input<string | null>(null);
  readonly description = input<string | null>(null);
  readonly direction = input<RadioGroupDirection>('vertical');
  readonly required = input(false, { transform: Boolean });
  readonly groupId = input<string | null>(null);

  protected readonly autoId = `app-radio-group-${++nextId}`;

  protected readonly resolvedId = computed(() => this.groupId() ?? this.autoId);
  protected readonly labelId = computed(() => `${this.resolvedId()}-label`);
  protected readonly descriptionId = computed(
    () => `${this.resolvedId()}-description`,
  );

  protected readonly rootClass = computed(
    () => `radio-group radio-group--${this.direction()}`,
  );

  protected readonly describedBy = computed(() => {
    const ids: string[] = [];
    if (this.label()) ids.push(this.labelId());
    if (this.description()) ids.push(this.descriptionId());
    return ids.length ? ids.join(' ') : null;
  });
}
