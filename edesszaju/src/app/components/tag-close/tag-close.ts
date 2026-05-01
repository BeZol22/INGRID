import { Component, computed, input, output } from '@angular/core';

export type TagCloseSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-tag-close',
  templateUrl: './tag-close.html',
  styleUrl: './tag-close.scss',
})
export class TagClose {
  readonly size = input<TagCloseSize>('sm');
  readonly disabled = input(false, { transform: Boolean });
  readonly ariaLabel = input<string>('Eltávolítás');

  readonly clicked = output<MouseEvent>();

  protected readonly rootClass = computed(() =>
    [
      'tag-close',
      `tag-close--${this.size()}`,
      this.disabled() ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onClick(event: MouseEvent) {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.clicked.emit(event);
  }
}
