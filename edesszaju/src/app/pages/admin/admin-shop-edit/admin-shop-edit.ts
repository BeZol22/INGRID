import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { CakeShop, PriceRange } from '../../../models';
import { Icon } from '../../../components/icon';

@Component({
  selector: 'page-admin-shop-edit',
  imports: [RouterLink, Icon],
  templateUrl: './admin-shop-edit.html',
  styleUrl: './admin-shop-edit.scss',
})
export class AdminShopEditPage {
  private readonly data = inject(DataService);
  private readonly router = inject(Router);

  readonly id = input<string>();

  protected readonly existing = computed(() => {
    const i = this.id();
    return i ? this.data.shops().find((s) => s.id === i) : undefined;
  });

  protected readonly name = signal('');
  protected readonly city = signal('');
  protected readonly address = signal('');
  protected readonly description = signal('');
  protected readonly imageUrl = signal('');
  protected readonly specialtiesText = signal('');
  protected readonly priceRange = signal<PriceRange>('$$');
  protected readonly openingHours = signal('');
  protected readonly phone = signal('');
  protected readonly website = signal('');
  protected readonly featured = signal(false);

  private hydrated = false;

  constructor() {
    effect(() => {
      const e = this.existing();
      if (!e || this.hydrated) return;
      this.name.set(e.name);
      this.city.set(e.city);
      this.address.set(e.address);
      this.description.set(e.description);
      this.imageUrl.set(e.imageUrl);
      this.specialtiesText.set(e.specialties.join(', '));
      this.priceRange.set(e.priceRange);
      this.openingHours.set(e.openingHours);
      this.phone.set(e.phone);
      this.website.set(e.website);
      this.featured.set(e.featured);
      this.hydrated = true;
    });
  }

  protected readonly canSave = computed(
    () =>
      this.name().trim().length > 1 &&
      this.city().trim().length > 1 &&
      this.description().trim().length > 5,
  );

  protected save(e: Event) {
    e.preventDefault();
    if (!this.canSave()) return;
    const specialties = this.specialtiesText()
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const fallbackImage = this.imageUrl().trim() || this.placeholder(this.name());

    const payload: Omit<CakeShop, 'id' | 'slug' | 'createdAt' | 'reviews'> = {
      name: this.name().trim(),
      city: this.city().trim(),
      address: this.address().trim(),
      description: this.description().trim(),
      imageUrl: fallbackImage,
      specialties,
      priceRange: this.priceRange(),
      openingHours: this.openingHours().trim(),
      phone: this.phone().trim(),
      website: this.website().trim(),
      featured: this.featured(),
    };

    const ex = this.existing();
    if (ex) {
      this.data.updateShop(ex.id, payload);
    } else {
      this.data.createShop(payload);
    }
    this.router.navigateByUrl('/admin/cukraszdak');
  }

  protected remove(s: CakeShop) {
    if (confirm(`Biztosan törlöd: "${s.name}"?`)) {
      this.data.deleteShop(s.id);
      this.router.navigateByUrl('/admin/cukraszdak');
    }
  }

  private placeholder(name: string): string {
    const seed = (name || 'Cukrászda').slice(0, 12);
    const hue = (seed.charCodeAt(0) * 7) % 360;
    return `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'>
        <defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
          <stop offset='0%' stop-color='hsl(${hue},70%,80%)'/>
          <stop offset='100%' stop-color='hsl(${(hue + 40) % 360},65%,55%)'/>
        </linearGradient></defs>
        <rect width='800' height='500' fill='url(#g)'/>
        <text x='50%' y='52%' font-family='Georgia, serif' font-size='80' fill='rgba(255,255,255,0.85)' text-anchor='middle' font-weight='700'>${seed}</text>
      </svg>`,
    )}`;
  }

  protected asInput(e: Event): HTMLInputElement {
    return e.target as HTMLInputElement;
  }
  protected asTextarea(e: Event): HTMLTextAreaElement {
    return e.target as HTMLTextAreaElement;
  }
  protected asPrice(e: Event): PriceRange {
    return (e.target as HTMLSelectElement).value as PriceRange;
  }
}
