import { Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'page-admin-dashboard',
  imports: [RouterLink, DatePipe],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboardPage {
  protected readonly data = inject(DataService);

  protected readonly totalReviews = computed(() =>
    this.data.shops().reduce((acc, s) => acc + s.reviews.length, 0),
  );

  protected readonly recentShops = computed(() =>
    [...this.data.shops()]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 5),
  );

  protected readonly recentPosts = computed(() =>
    [...this.data.posts()]
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() -
          new Date(a.publishedAt).getTime(),
      )
      .slice(0, 5),
  );

  protected resetSeed() {
    if (confirm('Biztosan visszaállítod az adatokat a kezdő állapotra?')) {
      this.data.resetSeed();
    }
  }
}
