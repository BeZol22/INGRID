import { Component, computed, input, output } from '@angular/core';
import { TagCheckbox, TagCheckboxSize } from '../tag-checkbox/tag-checkbox';
import { TagClose, TagCloseSize } from '../tag-close/tag-close';
import { TagCount, TagCountSize } from '../tag-count/tag-count';

export type TagSize = 'sm' | 'md' | 'lg';
export type TagAction = 'none' | 'close' | 'count';

@Component({
  selector: 'app-tag',
  imports: [TagCheckbox, TagClose, TagCount],
  templateUrl: './tag.html',
  styleUrl: './tag.scss',
})
export class Tag {
  readonly label = input.required<string>();
  readonly size = input<TagSize>('sm');
  readonly action = input<TagAction>('none');
  readonly count = input<number | string | null>(null);
  readonly checkbox = input(false, { transform: Boolean });
  readonly checked = input(false, { transform: Boolean });
  readonly disabled = input(false, { transform: Boolean });
  readonly closeAriaLabel = input<string>('Eltávolítás');

  readonly closed = output<MouseEvent>();
  readonly checkedChange = output<boolean>();

  protected readonly rootClass = computed(() =>
    [
      'tag',
      `tag--${this.size()}`,
      this.checkbox() ? 'tag--has-checkbox' : '',
      this.checked() ? 'is-checked' : '',
      this.disabled() ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  /** Sub-component sizes follow the tag size 1:1. */
  protected readonly checkboxSize = computed<TagCheckboxSize>(() => this.size());
  protected readonly closeSize = computed<TagCloseSize>(() => this.size());
  protected readonly countSize = computed<TagCountSize>(() => this.size());

  protected onClose(event: MouseEvent) {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.closed.emit(event);
  }

  protected onCheckedChange(value: boolean) {
    this.checkedChange.emit(value);
  }
}
