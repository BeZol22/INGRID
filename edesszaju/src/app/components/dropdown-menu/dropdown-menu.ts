import {
  Component,
  ElementRef,
  HostListener,
  computed,
  input,
  output,
  signal,
} from '@angular/core';

export type DropdownAlign = 'start' | 'end';
export type DropdownPlacement = 'bottom' | 'top';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.html',
  styleUrl: './dropdown-menu.scss',
})
export class DropdownMenu {
  readonly align = input<DropdownAlign>('start');
  readonly placement = input<DropdownPlacement>('bottom');
  readonly offset = input<number>(4);
  readonly closeOnSelect = input(true, { transform: Boolean });
  readonly disabled = input(false, { transform: Boolean });
  readonly panelWidth = input<string | null>(null);

  readonly openChange = output<boolean>();

  protected readonly isOpen = signal(false);

  protected readonly panelClass = computed(() =>
    [
      'dropdown-menu__panel',
      `dropdown-menu__panel--${this.placement()}`,
      `dropdown-menu__panel--${this.align()}`,
    ].join(' '),
  );

  protected readonly panelStyle = computed(() => {
    const w = this.panelWidth();
    return w ? `width: ${w}` : '';
  });

  constructor(private readonly host: ElementRef<HTMLElement>) {}

  toggle() {
    if (this.disabled()) return;
    this.isOpen() ? this.close() : this.open();
  }

  open() {
    if (this.disabled() || this.isOpen()) return;
    this.isOpen.set(true);
    this.openChange.emit(true);
  }

  close() {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    this.openChange.emit(false);
  }

  protected onTriggerClick(event: MouseEvent) {
    event.stopPropagation();
    this.toggle();
  }

  protected onPanelClick(event: MouseEvent) {
    if (!this.closeOnSelect()) return;
    const target = event.target as HTMLElement | null;
    if (!target) return;
    // Close on any click that originated from an interactive descendant
    // (button, anchor, or anything with role="menuitem*"/"option")
    const hit = target.closest(
      'button, a, [role="menuitem"], [role="menuitemradio"], [role="menuitemcheckbox"], [role="option"]',
    );
    if (hit) this.close();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.isOpen()) return;
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isOpen()) this.close();
  }
}
