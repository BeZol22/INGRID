import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { BlogPost } from '../../../models';

@Component({
  selector: 'page-admin-post-edit',
  imports: [RouterLink],
  templateUrl: './admin-post-edit.html',
  styleUrl: './admin-post-edit.scss',
})
export class AdminPostEditPage {
  private readonly data = inject(DataService);
  private readonly router = inject(Router);

  readonly id = input<string>();

  protected readonly existing = computed(() => {
    const i = this.id();
    return i ? this.data.posts().find((p) => p.id === i) : undefined;
  });

  protected readonly title = signal('');
  protected readonly excerpt = signal('');
  protected readonly content = signal('');
  protected readonly author = signal('Szerkesztőség');
  protected readonly coverImageUrl = signal('');
  protected readonly tagsText = signal('');
  protected readonly publishedAt = signal(new Date().toISOString().slice(0, 10));

  private hydrated = false;

  constructor() {
    effect(() => {
      const e = this.existing();
      if (!e || this.hydrated) return;
      this.title.set(e.title);
      this.excerpt.set(e.excerpt);
      this.content.set(e.content);
      this.author.set(e.author);
      this.coverImageUrl.set(e.coverImageUrl);
      this.tagsText.set(e.tags.join(', '));
      this.publishedAt.set(e.publishedAt.slice(0, 10));
      this.hydrated = true;
    });
  }

  protected readonly canSave = computed(
    () =>
      this.title().trim().length > 1 &&
      this.excerpt().trim().length > 5 &&
      this.content().trim().length > 10,
  );

  protected save(e: Event) {
    e.preventDefault();
    if (!this.canSave()) return;
    const tags = this.tagsText()
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);
    const payload: Omit<BlogPost, 'id' | 'slug' | 'createdAt'> = {
      title: this.title().trim(),
      excerpt: this.excerpt().trim(),
      content: this.content().trim(),
      author: this.author().trim() || 'Szerkesztőség',
      coverImageUrl: this.coverImageUrl().trim() || this.placeholder(this.title()),
      tags,
      publishedAt: new Date(this.publishedAt() || new Date().toISOString()).toISOString(),
    };
    const ex = this.existing();
    if (ex) {
      this.data.updatePost(ex.id, payload);
    } else {
      this.data.createPost(payload);
    }
    this.router.navigateByUrl('/admin/blog');
  }

  protected remove(p: BlogPost) {
    if (confirm(`Biztosan törlöd: "${p.title}"?`)) {
      this.data.deletePost(p.id);
      this.router.navigateByUrl('/admin/blog');
    }
  }

  private placeholder(title: string): string {
    const seed = (title || 'Cikk').slice(0, 14);
    const hue = (seed.charCodeAt(0) * 9) % 360;
    return `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'>
        <defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
          <stop offset='0%' stop-color='hsl(${hue},65%,82%)'/>
          <stop offset='100%' stop-color='hsl(${(hue + 30) % 360},60%,55%)'/>
        </linearGradient></defs>
        <rect width='800' height='500' fill='url(#g)'/>
        <text x='50%' y='52%' font-family='Georgia, serif' font-size='72' fill='rgba(255,255,255,0.9)' text-anchor='middle' font-weight='700'>${seed}</text>
      </svg>`,
    )}`;
  }

  protected asInput(e: Event): HTMLInputElement {
    return e.target as HTMLInputElement;
  }
  protected asTextarea(e: Event): HTMLTextAreaElement {
    return e.target as HTMLTextAreaElement;
  }
}
