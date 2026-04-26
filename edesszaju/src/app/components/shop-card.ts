import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CakeShop } from '../models';
import { DataService } from '../services/data.service';

@Component({
  selector: 'shop-card',
  imports: [RouterLink],
  templateUrl: './shop-card.html',
  styleUrl: './shop-card.scss',
})
export class ShopCard {
  readonly shop = input.required<CakeShop>();
  private readonly data = inject(DataService);
  protected readonly avg = computed(() => this.data.averageRating(this.shop()));
}
