import { Component, computed, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import { PaginationButton } from '../pagination-button/pagination-button';
import { PaginationItem } from '../pagination-item/pagination-item';
import { Select } from '../select/select';

export type PaginationLayout =
  | 'page-default'
  | 'page-minimal'
  | 'card-default'
  | 'card-minimal-left'
  | 'card-minimal-center'
  | 'card-minimal-right'
  | 'card-buttons-left'
  | 'card-buttons-right'
  | 'card-advanced'
  | 'card-advanced-center';

export type PaginationShape = 'square' | 'circle';

export type PaginationCell = number | 'ellipsis';

@Component({
  selector: 'app-pagination',
  imports: [Button, Icon, NgTemplateOutlet, PaginationButton, PaginationItem, Select],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  readonly layout = input<PaginationLayout>('page-default');
  readonly shape = input<PaginationShape>('square');
  readonly currentPage = input(1, { transform: (v: unknown) => Number(v) || 1 });
  readonly totalPages = input(1, { transform: (v: unknown) => Math.max(1, Number(v) || 1) });
  readonly siblingCount = input(1, { transform: (v: unknown) => Math.max(0, Number(v) || 0) });
  readonly boundaryCount = input(1, { transform: (v: unknown) => Math.max(0, Number(v) || 0) });

  readonly pageSize = input<number | null>(null);
  readonly pageSizeOptions = input<number[]>([]);
  readonly pageSizeUnit = input<string>('per page');

  readonly previousLabel = input<string>('Previous');
  readonly nextLabel = input<string>('Next');
  /** Template string with `{current}` and `{total}` placeholders. */
  readonly pageLabel = input<string>('Page {current} of {total}');

  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();

  protected readonly hasPrev = computed(() => this.currentPage() > 1);
  protected readonly hasNext = computed(() => this.currentPage() < this.totalPages());

  protected readonly isCardLayout = computed(() => this.layout().startsWith('card-'));
  protected readonly isMinimalLayout = computed(() =>
    this.layout().startsWith('card-minimal-'),
  );
  protected readonly isButtonsLayout = computed(() =>
    this.layout().startsWith('card-buttons-'),
  );
  protected readonly isAdvancedLayout = computed(() =>
    this.layout().startsWith('card-advanced'),
  );
  protected readonly isCenterLayout = computed(() => {
    const l = this.layout();
    return (
      l === 'page-minimal' ||
      l === 'card-minimal-center' ||
      l === 'card-advanced-center'
    );
  });
  protected readonly showNumberedList = computed(() => {
    const l = this.layout();
    return (
      l === 'page-default' ||
      l === 'page-minimal' ||
      l === 'card-default' ||
      l === 'card-advanced' ||
      l === 'card-advanced-center'
    );
  });

  protected readonly cells = computed<PaginationCell[]>(() => {
    const total = this.totalPages();
    const current = Math.min(Math.max(1, this.currentPage()), total);
    const sibling = this.siblingCount();
    const boundary = this.boundaryCount();

    // If everything fits, render all pages.
    const totalNumbers = boundary * 2 + sibling * 2 + 3; // first, last, current, ellipses
    if (total <= totalNumbers) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const startPages = range(1, Math.min(boundary, total));
    const endPages = range(Math.max(total - boundary + 1, boundary + 1), total);

    const siblingsStart = Math.max(
      Math.min(current - sibling, total - boundary - sibling * 2 - 1),
      boundary + 2,
    );
    const siblingsEnd = Math.min(
      Math.max(current + sibling, boundary + sibling * 2 + 2),
      total - boundary - 1,
    );

    const cells: PaginationCell[] = [
      ...startPages,
      ...(siblingsStart > boundary + 2
        ? (['ellipsis'] as PaginationCell[])
        : boundary + 1 < total - boundary
          ? ([boundary + 1] as PaginationCell[])
          : []),
      ...range(siblingsStart, siblingsEnd),
      ...(siblingsEnd < total - boundary - 1
        ? (['ellipsis'] as PaginationCell[])
        : total - boundary > boundary
          ? ([total - boundary] as PaginationCell[])
          : []),
      ...endPages,
    ];

    return cells;
  });

  protected readonly pageLabelText = computed(() =>
    this.pageLabel()
      .replace('{current}', String(this.currentPage()))
      .replace('{total}', String(this.totalPages())),
  );

  protected readonly currentPageSizeLabel = computed(() => {
    const ps = this.pageSize();
    if (ps == null) return null;
    return `${ps} ${this.pageSizeUnit()}`;
  });

  protected readonly rootClass = computed(() =>
    [
      'pagination',
      `pagination--${this.layout()}`,
      this.isCardLayout() ? 'pagination--card' : '',
      this.isCenterLayout() ? 'pagination--center' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected goTo(page: number) {
    const clamped = Math.min(Math.max(1, page), this.totalPages());
    if (clamped === this.currentPage()) return;
    this.pageChange.emit(clamped);
  }

  protected onPrev() {
    if (this.hasPrev()) this.goTo(this.currentPage() - 1);
  }

  protected onNext() {
    if (this.hasNext()) this.goTo(this.currentPage() + 1);
  }

  protected onFirst() {
    if (this.hasPrev()) this.goTo(1);
  }

  protected onLast() {
    if (this.hasNext()) this.goTo(this.totalPages());
  }

  protected onPageSizeChange(value: string | null) {
    if (value == null) return;
    const n = Number(value);
    if (!Number.isFinite(n) || n <= 0) return;
    this.pageSizeChange.emit(n);
  }
}

function range(start: number, end: number): number[] {
  if (end < start) return [];
  const len = end - start + 1;
  return Array.from({ length: len }, (_, i) => start + i);
}
