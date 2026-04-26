import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ShopCard } from '../../components/shop-card';
import { PostCard } from '../../components/post-card';

@Component({
  selector: 'page-home',
  imports: [RouterLink, ShopCard, PostCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomePage {
  protected readonly data = inject(DataService);
  private readonly router = inject(Router);

  protected readonly query = signal('');
  protected readonly city = signal('');

  protected readonly totalReviews = computed(() =>
    this.data.shops().reduce((acc, s) => acc + s.reviews.length, 0),
  );

  protected onSearch(e: Event) {
    e.preventDefault();
    this.router.navigate(['/cukraszdak'], {
      queryParams: {
        q: this.query() || null,
        v: this.city() || null,
      },
    });
  }

  protected asInput(e: Event): HTMLInputElement {
    return e.target as HTMLInputElement;
  }
  protected asSelect(e: Event): HTMLSelectElement {
    return e.target as HTMLSelectElement;
  }
}
