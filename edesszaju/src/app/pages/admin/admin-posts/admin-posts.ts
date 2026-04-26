import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'page-admin-posts',
  imports: [RouterLink, DatePipe],
  templateUrl: './admin-posts.html',
  styleUrl: './admin-posts.scss',
})
export class AdminPostsPage {
  protected readonly data = inject(DataService);
  protected readonly query = signal('');

  protected readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const list = this.data.posts();
    if (!q) return list;
    return list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    );
  });

  protected duplicate(id: string) {
    this.data.duplicatePost(id);
  }

  protected remove(p: { id: string; title: string }) {
    if (confirm(`Biztosan törlöd: "${p.title}"?`)) {
      this.data.deletePost(p.id);
    }
  }

  protected asInput(e: Event): HTMLInputElement {
    return e.target as HTMLInputElement;
  }
}
