import {
  Component,
  ElementRef,
  HostListener,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';

export type MultiSelectSize = 'sm' | 'md' | 'lg';

let nextId = 0;

@Component({
  selector: 'app-multi-select',
  imports: [Button, Icon],
  templateUrl: './multi-select.html',
  styleUrl: './multi-select.scss',
})
export class MultiSelect {
  readonly label = input<string | null>(null);
  readonly placeholder = input<string>('Válassz…');
  readonly size = input<MultiSelectSize>('md');
  readonly required = input(false, { transform: Boolean });
  readonly disabled = input(false, { transform: Boolean });
  readonly hint = input<string | null>(null);
  readonly error = input<string | null>(null);

  /** Number of selected items — drives the trigger summary. */
  readonly selectedCount = input<number>(0);
  /** Optional secondary summary, e.g. total user count: `'16 users'`. */
  readonly selectedSecondary = input<string | null>(null);
  /** Override the auto-generated `'N selected'` text if needed. */
  readonly selectedLabel = input<string | null>(null);

  // Search
  readonly searchValue = input<string>('');
  readonly searchPlaceholder = input<string>('Keresés');
  /** When true, the panel renders the empty-state placeholder instead of options. */
  readonly empty = input(false, { transform: Boolean });
  readonly emptyTitle = input<string>('Nincs találat');
  readonly emptyHint = input<string>('Próbálj más keresőszót.');
  readonly clearSearchLabel = input<string>('Keresés törlése');

  // Footer
  readonly showFooter = input(true, { transform: Boolean });
  readonly resetLabel = input<string>('Reset');
  readonly selectAllLabel = input<string>('Select all');

  readonly openChange = output<boolean>();
  readonly searchChange = output<string>();
  readonly searchCleared = output<void>();
  readonly resetClicked = output<void>();
  readonly selectAllClicked = output<void>();

  protected readonly autoId = `app-multi-select-${++nextId}`;
  protected readonly isOpen = signal(false);

  private readonly host = inject(ElementRef<HTMLElement>);

  protected readonly hasError = computed(() => !!this.error());
  protected readonly hasSelection = computed(() => this.selectedCount() > 0);

  protected readonly summary = computed(() => {
    const explicit = this.selectedLabel();
    if (explicit) return explicit;
    const n = this.selectedCount();
    return n > 0 ? `${n} kiválasztva` : null;
  });

  protected readonly rootClass = computed(() =>
    [
      'multi-select',
      `multi-select--${this.size()}`,
      this.isOpen() ? 'is-open' : '',
      this.hasSelection() ? 'is-filled' : 'is-placeholder',
      this.hasError() ? 'is-error' : '',
      this.disabled() ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

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

  toggle() {
    this.isOpen() ? this.close() : this.open();
  }

  protected onTriggerClick(event: MouseEvent) {
    if (this.disabled()) return;
    event.stopPropagation();
    this.toggle();
  }

  protected onSearchInput(event: Event) {
    this.searchChange.emit((event.target as HTMLInputElement).value);
  }

  protected onClearSearch() {
    this.searchChange.emit('');
    this.searchCleared.emit();
  }

  protected onReset() {
    this.resetClicked.emit();
  }

  protected onSelectAll() {
    this.selectAllClicked.emit();
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
