import { Component, computed, inject, input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Icon } from '../../components/icon/icon';
import { Button } from '../../components/button/button';

@Component({
  selector: 'page-shop-detail',
  imports: [RouterLink, DatePipe, Icon, Button],
  templateUrl: './shop-detail.html',
  styleUrl: './shop-detail.scss',
})
export class ShopDetailPage {
  protected readonly data = inject(DataService);

  readonly slug = input<string>();

  protected readonly shop = computed(() => {
    const s = this.slug();
    return s ? this.data.shopBySlug(s) : undefined;
  });

  protected readonly avg = computed(() => {
    const s = this.shop();
    return s ? this.data.averageRating(s) : 0;
  });

  protected readonly roundedAvg = computed(() => Math.round(this.avg()));

  protected readonly author = signal('');
  protected readonly comment = signal('');
  protected readonly rating = signal(5);

  protected submit(e: Event) {
    e.preventDefault();
    const s = this.shop();
    if (!s) return;
    if (!this.author().trim() || !this.comment().trim()) return;
    this.data.addReview(s.id, {
      author: this.author().trim(),
      comment: this.comment().trim(),
      rating: this.rating(),
    });
    this.author.set('');
    this.comment.set('');
    this.rating.set(5);
  }

  protected encode(s: string) {
    return encodeURIComponent(s);
  }

  protected asInput(e: Event): HTMLInputElement {
    return e.target as HTMLInputElement;
  }
  protected asTextarea(e: Event): HTMLTextAreaElement {
    return e.target as HTMLTextAreaElement;
  }
}
