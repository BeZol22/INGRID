import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ShopCard } from '../../components/shop-card/shop-card';
import { PostCard } from '../../components/post-card/post-card';
import { Icon } from '../../components/icon/icon';
import { Button } from '../../components/button/button';
import { PriceRange } from '../../models';

@Component({
  selector: 'page-home',
  imports: [RouterLink, ShopCard, PostCard, Icon, Button],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomePage {
  protected readonly data = inject(DataService);
  private readonly router = inject(Router);

  protected readonly query = signal('');

  protected readonly spotlight = computed(
    () => this.data.featuredShops()[0] ?? this.data.shops()[0],
  );

  protected onSearch(e: Event) {
    e.preventDefault();
    this.goSearch();
  }

  protected goSearch() {
    this.router.navigate(['/cukraszdak'], {
      queryParams: { q: this.query().trim() || null },
    });
  }

  protected subtitle(price: PriceRange): string {
    if (price === '$') return 'Kézműves cukrászda';
    if (price === '$$$') return 'Prémium cukrászda';
    return 'Klasszikus cukrászda';
  }

  protected asInput(e: Event): HTMLInputElement {
    return e.target as HTMLInputElement;
  }
}
