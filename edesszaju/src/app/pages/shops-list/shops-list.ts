import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataService } from '../../services/data.service';
import { ShopCard } from '../../components/shop-card';
import { PriceRange } from '../../models';

type SortKey = 'rating' | 'name' | 'newest';

@Component({
  selector: 'page-shops-list',
  imports: [ShopCard],
  templateUrl: './shops-list.html',
  styleUrl: './shops-list.scss',
})
export class ShopsListPage {
  protected readonly data = inject(DataService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly query = signal('');
  protected readonly city = signal('');
  protected readonly price = signal<PriceRange | ''>('');
  protected readonly sort = signal<SortKey>('rating');

  private readonly params = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  protected readonly priceOptions: { value: PriceRange | ''; label: string }[] = [
    { value: '', label: 'Mind' },
    { value: '$', label: '$ — Megfizethető' },
    { value: '$$', label: '$$ — Közepes' },
    { value: '$$$', label: '$$$ — Prémium' },
  ];

  constructor() {
    const p = this.params();
    if (p.get('q')) this.query.set(p.get('q')!);
    if (p.get('v')) this.city.set(p.get('v')!);
  }

  protected readonly filtered = computed(() => {
    const list = this.data.searchShops(this.query(), this.city());
    const p = this.price();
    const filteredByPrice = p ? list.filter((s) => s.priceRange === p) : list;
    const sortKey = this.sort();
    return [...filteredByPrice].sort((a, b) => {
      if (sortKey === 'name') return a.name.localeCompare(b.name, 'hu');
      if (sortKey === 'newest')
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      return this.data.averageRating(b) - this.data.averageRating(a);
    });
  });

  protected togglePrice(p: PriceRange | '') {
    this.price.set(this.price() === p ? '' : p);
  }

  protected reset() {
    this.query.set('');
    this.city.set('');
    this.price.set('');
    this.sort.set('rating');
    this.router.navigate([], { queryParams: {} });
  }

  protected asInput(e: Event): HTMLInputElement {
    return e.target as HTMLInputElement;
  }
  protected asSort(e: Event): SortKey {
    return (e.target as HTMLSelectElement).value as SortKey;
  }
}
