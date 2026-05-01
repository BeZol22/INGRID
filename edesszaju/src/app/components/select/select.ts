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
import { Icon, IconName } from '../icon/icon';

export type SelectSize = 'sm' | 'md' | 'lg';

let nextId = 0;

@Component({
  selector: 'app-select',
  imports: [Icon],
  templateUrl: './select.html',
  styleUrl: './select.scss',
})
export class Select {
  readonly label = input<string | null>(null);
  readonly placeholder = input<string>('Válassz…');
  readonly size = input<SelectSize>('md');
  readonly value = input<string | null>(null);
  /** Text shown in the trigger when a value is selected. Defaults to `value`. */
  readonly displayValue = input<string | null>(null);
  readonly icon = input<IconName | null>(null);
  readonly required = input(false, { transform: Boolean });
  readonly disabled = input(false, { transform: Boolean });
  readonly hint = input<string | null>(null);
  readonly error = input<string | null>(null);

  /** When true, replaces the trigger with a search input that filters options. */
  readonly searchable = input(false, { transform: Boolean });
  readonly searchPlaceholder = input<string>('Keresés…');
  readonly searchValue = input<string>('');

  readonly valueChange = output<string | null>();
  readonly openChange = output<boolean>();
  readonly searchChange = output<string>();

  protected readonly autoId = `app-select-${++nextId}`;
  protected readonly isOpen = signal(false);

  protected readonly resolvedId = computed(() => this.autoId);
  protected readonly hasError = computed(() => !!this.error());
  protected readonly displayed = computed(
    () => this.displayValue() ?? this.value(),
  );
  protected readonly hasValue = computed(() => !!this.displayed());

  protected readonly rootClass = computed(() =>
    [
      'select',
      `select--${this.size()}`,
      this.icon() ? 'select--has-icon' : '',
      this.searchable() ? 'select--searchable' : '',
      this.isOpen() ? 'is-open' : '',
      this.hasValue() ? 'is-filled' : 'is-placeholder',
      this.hasError() ? 'is-error' : '',
      this.disabled() ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  private readonly host = inject(ElementRef<HTMLElement>);

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
    const v = (event.target as HTMLInputElement).value;
    this.searchChange.emit(v);
    if (!this.isOpen()) this.open();
  }

  protected onPanelClick(event: MouseEvent) {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    const hit = target.closest(
      'button, a, [role="option"], [role="menuitem"]',
    );
    if (hit) this.close();
  }

  /** Programmatic value setter for templates that do their own dispatch. */
  setValue(v: string | null) {
    this.valueChange.emit(v);
    this.close();
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
