import { Component, computed, inject, signal } from '@angular/core';
import { DataService } from '../../services/data.service';
import { PostCard } from '../../components/post-card';

@Component({
  selector: 'page-blog-list',
  imports: [PostCard],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.scss',
})
export class BlogListPage {
  protected readonly data = inject(DataService);

  protected readonly query = signal('');
  protected readonly tag = signal('');

  protected readonly tags = computed(() => {
    const all = new Set<string>();
    for (const p of this.data.posts()) p.tags.forEach((t) => all.add(t));
    return Array.from(all).sort();
  });

  protected readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const t = this.tag();
    return [...this.data.posts()]
      .filter((p) => {
        const matchesQ =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q);
        const matchesT = !t || p.tags.includes(t);
        return matchesQ && matchesT;
      })
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() -
          new Date(a.publishedAt).getTime(),
      );
  });

  protected asInput(e: Event): HTMLInputElement {
    return e.target as HTMLInputElement;
  }
}
