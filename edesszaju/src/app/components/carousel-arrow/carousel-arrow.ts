import { Component, computed, input, output } from '@angular/core';
import { Icon } from '../icon/icon';

export type CarouselArrowDirection = 'left' | 'right';
export type CarouselArrowSize = 'md' | 'lg';
/**
 * Visual treatment:
 *   scrim            — translucent white circle with backdrop-blur (default;
 *                      used over images / heroes)
 *   bordered-chevron — bordered ring with chevron glyph; hover fills gold
 *                      (used for testimonial / on-page carousels)
 *   bordered-arrow   — bordered ring with arrow glyph; hover fills gold
 *   plain            — bare arrow glyph, no button chrome
 */
export type CarouselArrowVariant =
  | 'scrim'
  | 'bordered-chevron'
  | 'bordered-arrow'
  | 'plain';

@Component({
  selector: 'app-carousel-arrow',
  imports: [Icon],
  templateUrl: './carousel-arrow.html',
  styleUrl: './carousel-arrow.scss',
})
export class CarouselArrow {
  readonly direction = input<CarouselArrowDirection>('left');
  readonly size = input<CarouselArrowSize>('md');
  readonly variant = input<CarouselArrowVariant>('scrim');
  readonly disabled = input(false, { transform: Boolean });
  readonly ariaLabel = input<string | null>(null);

  readonly clicked = output<MouseEvent>();

  protected readonly rootClass = computed(() =>
    [
      'carousel-arrow',
      `carousel-arrow--${this.direction()}`,
      `carousel-arrow--${this.size()}`,
      `carousel-arrow--${this.variant()}`,
    ].join(' '),
  );

  /** Choose chevron vs arrow based on the variant. */
  protected readonly iconName = computed(() => {
    const useArrow =
      this.variant() === 'bordered-arrow' || this.variant() === 'plain';
    if (useArrow) {
      return this.direction() === 'left' ? 'arrow-left' : 'arrow-right';
    }
    return this.direction() === 'left' ? 'chevron-left' : 'chevron-right';
  });

  protected readonly resolvedAriaLabel = computed(
    () => this.ariaLabel() ?? (this.direction() === 'left' ? 'Előző' : 'Következő'),
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
