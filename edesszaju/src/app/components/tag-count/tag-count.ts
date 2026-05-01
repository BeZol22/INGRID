import { Component, computed, input } from '@angular/core';

export type TagCountSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-tag-count',
  templateUrl: './tag-count.html',
  styleUrl: './tag-count.scss',
})
export class TagCount {
  readonly count = input.required<number | string>();
  readonly size = input<TagCountSize>('sm');
  readonly ariaLabel = input<string | null>(null);

  protected readonly rootClass = computed(
    () => `tag-count tag-count--${this.size()}`,
  );
}
