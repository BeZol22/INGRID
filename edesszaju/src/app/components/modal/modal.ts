import {
  Component,
  ElementRef,
  HostListener,
  computed,
  effect,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  readonly open = input(false, { transform: Boolean });
  readonly size = input<ModalSize>('md');
  readonly closeOnBackdrop = input(true, { transform: Boolean });
  readonly closeOnEscape = input(true, { transform: Boolean });
  readonly ariaLabel = input<string | null>(null);
  readonly ariaLabelledBy = input<string | null>(null);
  readonly ariaDescribedBy = input<string | null>(null);

  readonly openChange = output<boolean>();
  readonly closed = output<void>();

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly dialogRef =
    viewChild<ElementRef<HTMLElement>>('dialog');

  /** Last-focused element before the modal opened (restored on close). */
  private previousFocus: Element | null = null;
  /** Original body overflow style (restored on close). */
  private originalBodyOverflow: string | null = null;

  protected readonly rootClass = computed(() =>
    [
      'modal',
      `modal--${this.size()}`,
      this.open() ? 'is-open' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  constructor() {
    effect(() => {
      if (this.open()) this.handleOpen();
      else this.handleClose();
    });
  }

  close() {
    if (!this.open()) return;
    this.openChange.emit(false);
    this.closed.emit();
  }

  protected onBackdropClick(event: MouseEvent) {
    if (!this.closeOnBackdrop()) return;
    // Only trigger when the click is on the backdrop itself, not on the dialog
    const dialog = this.dialogRef()?.nativeElement;
    if (dialog && (event.target as Node) === event.currentTarget) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.open() && this.closeOnEscape()) this.close();
  }

  private handleOpen() {
    // Lock body scroll
    if (typeof document !== 'undefined') {
      this.originalBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // Save current focus to restore later
      this.previousFocus = document.activeElement;
    }

    // Focus first focusable element inside the dialog (after render)
    queueMicrotask(() => {
      const dialog = this.dialogRef()?.nativeElement;
      if (!dialog) return;
      const focusable = dialog.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      focusable?.focus();
    });
  }

  private handleClose() {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = this.originalBodyOverflow ?? '';
      this.originalBodyOverflow = null;

      // Restore focus to previously-focused element
      const prev = this.previousFocus as HTMLElement | null;
      if (prev && typeof prev.focus === 'function') {
        prev.focus();
      }
      this.previousFocus = null;
    }
  }
}
