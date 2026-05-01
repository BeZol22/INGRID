import {
  Component,
  ElementRef,
  HostListener,
  Injector,
  afterNextRender,
  computed,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.html',
  styleUrl: './context-menu.scss',
})
export class ContextMenu {
  readonly closeOnSelect = input(true, { transform: Boolean });
  readonly disabled = input(false, { transform: Boolean });
  readonly panelWidth = input<string | null>(null);

  readonly openChange = output<boolean>();

  protected readonly isOpen = signal(false);
  protected readonly x = signal(0);
  protected readonly y = signal(0);

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly injector = inject(Injector);
  private readonly panelRef = viewChild<ElementRef<HTMLElement>>('panel');

  protected readonly panelStyle = computed(() => {
    const w = this.panelWidth();
    return w ? `width: ${w}` : '';
  });

  protected onContextMenu(event: MouseEvent) {
    if (this.disabled()) return;
    event.preventDefault();
    this.x.set(event.clientX);
    this.y.set(event.clientY);
    if (!this.isOpen()) {
      this.isOpen.set(true);
      this.openChange.emit(true);
    }
    // Run after the panel's measured DOM is laid out so we can flip if it
    // would clip the viewport.
    afterNextRender(() => this.adjustForViewport(), {
      injector: this.injector,
    });
  }

  protected onPanelClick(event: MouseEvent) {
    if (!this.closeOnSelect()) return;
    const target = event.target as HTMLElement | null;
    if (!target) return;
    const hit = target.closest(
      'button, a, [role="menuitem"], [role="menuitemradio"], [role="menuitemcheckbox"], [role="option"]',
    );
    if (hit) this.close();
  }

  close() {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    this.openChange.emit(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.isOpen()) return;
    const panel = this.panelRef()?.nativeElement;
    if (panel && !panel.contains(event.target as Node)) {
      this.close();
    }
  }

  @HostListener('document:contextmenu', ['$event'])
  onDocumentContextMenu(event: MouseEvent) {
    if (!this.isOpen()) return;
    const target = this.host.nativeElement.querySelector(
      '.context-menu__target',
    );
    if (target && !target.contains(event.target as Node)) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isOpen()) this.close();
  }

  @HostListener('window:resize')
  onResize() {
    if (this.isOpen()) this.close();
  }

  private adjustForViewport() {
    const panel = this.panelRef()?.nativeElement;
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let nx = this.x();
    let ny = this.y();
    if (rect.right > vw - 4) nx = Math.max(4, vw - rect.width - 4);
    if (rect.bottom > vh - 4) ny = Math.max(4, vh - rect.height - 4);
    if (nx !== this.x()) this.x.set(nx);
    if (ny !== this.y()) this.y.set(ny);
  }
}
