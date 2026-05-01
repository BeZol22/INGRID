import {
  Component,
  ElementRef,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { IconName } from '../icon/icon';
import {
  TabButton,
  TabButtonSize,
  TabButtonVariant,
} from '../tab-button/tab-button';

export type TabsListVariant =
  | 'brand'
  | 'gray'
  | 'underline'
  | 'border'
  | 'minimal';
export type TabsListDirection = 'horizontal' | 'vertical';

export interface TabsListItem {
  value: string;
  label: string;
  /** Show leading dot/icon (default true). */
  icon?: boolean;
  /** Override the leading dot with a real icon. */
  iconName?: IconName;
  /** Trailing badge content. */
  badge?: string | number;
  disabled?: boolean;
}

@Component({
  selector: 'app-tabs-list',
  imports: [TabButton],
  templateUrl: './tabs-list.html',
  styleUrl: './tabs-list.scss',
})
export class TabsList {
  readonly tabs = input<TabsListItem[]>([]);
  readonly value = input<string | null>(null);
  readonly variant = input<TabsListVariant>('brand');
  readonly size = input<TabButtonSize>('sm');
  readonly direction = input<TabsListDirection>('horizontal');
  readonly fullWidth = input(false, { transform: Boolean });
  readonly ariaLabel = input<string>('Tabs');

  readonly valueChange = output<string>();

  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);

  protected readonly isVertical = computed(() => this.direction() === 'vertical');

  /**
   * Map list-level variant to the tab-button variant rendered inside.
   * For the underline variant, vertical lists swap to the tab-button "line"
   * variant so the active emphasis becomes a left border instead of a
   * bottom border.
   */
  protected readonly buttonVariant = computed<TabButtonVariant>(() => {
    switch (this.variant()) {
      case 'border':
        return 'white';
      case 'underline':
        return this.isVertical() ? 'line' : 'underline';
      case 'gray':
        return 'gray';
      case 'minimal':
        return 'minimal';
      case 'brand':
      default:
        return 'brand';
    }
  });

  protected readonly rootClass = computed(() =>
    [
      'tabs-list',
      `tabs-list--${this.variant()}`,
      `tabs-list--${this.size()}`,
      `tabs-list--${this.direction()}`,
      this.fullWidth() ? 'tabs-list--full-width' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected readonly tabListAriaOrientation = computed(() =>
    this.isVertical() ? 'vertical' : 'horizontal',
  );

  protected onClick(item: TabsListItem) {
    if (item.disabled) return;
    if (item.value === this.value()) return;
    this.valueChange.emit(item.value);
  }

  protected onKeydown(event: KeyboardEvent) {
    const items = this.tabs().filter(t => !t.disabled);
    if (items.length === 0) return;

    const vertical = this.isVertical();
    const nextKey = vertical ? 'ArrowDown' : 'ArrowRight';
    const prevKey = vertical ? 'ArrowUp' : 'ArrowLeft';

    const currentValue = this.value();
    const currentIndex = items.findIndex(t => t.value === currentValue);
    let targetIndex: number | null = null;

    if (event.key === nextKey) {
      targetIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % items.length;
    } else if (event.key === prevKey) {
      targetIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
    } else if (event.key === 'Home') {
      targetIndex = 0;
    } else if (event.key === 'End') {
      targetIndex = items.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const target = items[targetIndex];
    if (!target || target.value === currentValue) return;
    this.valueChange.emit(target.value);

    // Move focus to the activated tab so keyboard users see the change
    queueMicrotask(() => {
      const buttons = this.host.nativeElement.querySelectorAll<HTMLElement>(
        '.tabs-list__item button, .tabs-list__item a',
      );
      buttons[targetIndex!]?.focus();
    });
  }
}
