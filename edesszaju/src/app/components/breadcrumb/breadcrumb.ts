import { Component, computed, input, output } from '@angular/core';
import {
  BreadcrumbItem,
  BreadcrumbItemVariant,
} from '../breadcrumb-item/breadcrumb-item';
import { IconName } from '../icon/icon';

export interface BreadcrumbCrumb {
  label?: string;
  icon?: IconName;
  routerLink?: string | unknown[] | null;
  href?: string | null;
  ariaLabel?: string;
}

export type BreadcrumbSeparator = 'chevron' | 'slash';

@Component({
  selector: 'app-breadcrumb',
  imports: [BreadcrumbItem],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class Breadcrumb {
  readonly items = input<readonly BreadcrumbCrumb[]>([]);
  readonly separator = input<BreadcrumbSeparator>('chevron');
  readonly variant = input<BreadcrumbItemVariant>('text');
  readonly ariaLabel = input<string>('Breadcrumb');

  /**
   * When > 0 and the item count exceeds this number, the middle is collapsed
   * to a "…" placeholder, keeping the first item and the last `maxVisible − 1`
   * items visible. 0 means show everything.
   */
  readonly maxVisible = input<number>(0);

  readonly ellipsisClicked = output<void>();

  protected readonly displayItems = computed(() => {
    const all = this.items();
    const max = this.maxVisible();
    if (!max || all.length <= max) {
      return all.map((c, i) => ({ kind: 'item' as const, crumb: c, index: i }));
    }
    // Keep first crumb + ellipsis + tail
    const tail = all.slice(all.length - (max - 1));
    return [
      { kind: 'item' as const, crumb: all[0], index: 0 },
      { kind: 'ellipsis' as const },
      ...tail.map((c, i) => ({
        kind: 'item' as const,
        crumb: c,
        index: all.length - tail.length + i,
      })),
    ];
  });

  protected readonly rootClass = computed(
    () => `breadcrumb breadcrumb--${this.variant()} breadcrumb--${this.separator()}`,
  );

  protected isLast(index: number) {
    return index === this.items().length - 1;
  }

  protected onEllipsis() {
    this.ellipsisClicked.emit();
  }
}
