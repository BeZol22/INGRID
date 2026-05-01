import { Component, computed, input } from '@angular/core';

export type CardImagePosition = 'top' | 'left' | 'none';
export type CardActions = 'inline' | 'stacked';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  readonly title = input<string | null>(null);
  readonly description = input<string | null>(null);
  readonly imageUrl = input<string | null>(null);
  readonly imageAlt = input<string>('');
  /** Where the image sits relative to the text. */
  readonly imagePosition = input<CardImagePosition>('top');
  /** Footer button layout. inline = side-by-side, stacked = full-width vertical. */
  readonly actions = input<CardActions>('inline');

  protected readonly hasImage = computed(
    () => !!this.imageUrl() && this.imagePosition() !== 'none',
  );

  protected readonly rootClass = computed(() =>
    [
      'card',
      `card--image-${this.imagePosition()}`,
      `card--actions-${this.actions()}`,
      this.hasImage() ? 'card--has-image' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );
}
