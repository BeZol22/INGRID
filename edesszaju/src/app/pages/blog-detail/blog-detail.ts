import { Component, computed, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Icon } from '../../components/icon/icon';
import { Button } from '../../components/button/button';

@Component({
  selector: 'page-blog-detail',
  imports: [RouterLink, DatePipe, Icon, Button],
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.scss',
})
export class BlogDetailPage {
  protected readonly data = inject(DataService);

  readonly slug = input<string>();

  protected readonly post = computed(() => {
    const s = this.slug();
    return s ? this.data.postBySlug(s) : undefined;
  });

  protected readonly paragraphs = computed(() => {
    const p = this.post();
    if (!p) return [];
    return p.content.split(/\n+/).filter((l) => l.trim().length);
  });

  protected readonly related = computed(() => {
    const p = this.post();
    if (!p) return [];
    return this.data
      .posts()
      .filter((x) => x.id !== p.id)
      .slice(0, 4);
  });

  protected readingMinutes(text: string): number {
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 180));
  }
}
