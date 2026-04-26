import { Injectable, computed, effect, signal } from '@angular/core';
import { BlogPost, CakeShop, Review } from '../models';
import { SEED_POSTS, SEED_SHOPS } from './seed-data';

const SHOPS_KEY = 'edesszaju.shops.v1';
const POSTS_KEY = 'edesszaju.posts.v1';

const uid = () => Math.random().toString(36).slice(2, 10);

const slugify = (input: string) =>
  input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || uid();

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly _shops = signal<CakeShop[]>(this.loadShops());
  private readonly _posts = signal<BlogPost[]>(this.loadPosts());

  readonly shops = this._shops.asReadonly();
  readonly posts = this._posts.asReadonly();

  readonly featuredShops = computed(() =>
    this._shops().filter((s) => s.featured),
  );

  readonly cities = computed(() =>
    Array.from(new Set(this._shops().map((s) => s.city))).sort(),
  );

  readonly latestPosts = computed(() =>
    [...this._posts()]
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      )
      .slice(0, 3),
  );

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(SHOPS_KEY, JSON.stringify(this._shops()));
      } catch {
        /* ignore */
      }
    });
    effect(() => {
      try {
        localStorage.setItem(POSTS_KEY, JSON.stringify(this._posts()));
      } catch {
        /* ignore */
      }
    });
  }

  averageRating(shop: CakeShop): number {
    if (!shop.reviews.length) return 0;
    const sum = shop.reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / shop.reviews.length) * 10) / 10;
  }

  shopBySlug(slug: string): CakeShop | undefined {
    return this._shops().find((s) => s.slug === slug);
  }

  postBySlug(slug: string): BlogPost | undefined {
    return this._posts().find((p) => p.slug === slug);
  }

  searchShops(query: string, city: string): CakeShop[] {
    const q = query.trim().toLowerCase();
    return this._shops().filter((s) => {
      const matchesQ =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.specialties.some((sp) => sp.toLowerCase().includes(q));
      const matchesCity = !city || s.city === city;
      return matchesQ && matchesCity;
    });
  }

  createShop(data: Omit<CakeShop, 'id' | 'slug' | 'createdAt' | 'reviews'>): CakeShop {
    const shop: CakeShop = {
      ...data,
      id: uid(),
      slug: this.uniqueSlug(slugify(data.name), 'shop'),
      createdAt: new Date().toISOString(),
      reviews: [],
    };
    this._shops.update((list) => [shop, ...list]);
    return shop;
  }

  updateShop(id: string, patch: Partial<Omit<CakeShop, 'id' | 'createdAt'>>): void {
    this._shops.update((list) =>
      list.map((s) => {
        if (s.id !== id) return s;
        const next = { ...s, ...patch };
        if (patch.name && patch.name !== s.name) {
          next.slug = this.uniqueSlug(slugify(patch.name), 'shop', id);
        }
        return next;
      }),
    );
  }

  deleteShop(id: string): void {
    this._shops.update((list) => list.filter((s) => s.id !== id));
  }

  duplicateShop(id: string): void {
    const original = this._shops().find((s) => s.id === id);
    if (!original) return;
    const copy: CakeShop = {
      ...original,
      id: uid(),
      name: `${original.name} (másolat)`,
      slug: this.uniqueSlug(slugify(`${original.name}-masolat`), 'shop'),
      createdAt: new Date().toISOString(),
      reviews: [],
      featured: false,
    };
    this._shops.update((list) => [copy, ...list]);
  }

  addReview(shopId: string, review: Omit<Review, 'id' | 'createdAt'>): void {
    const newReview: Review = {
      ...review,
      id: uid(),
      createdAt: new Date().toISOString(),
    };
    this._shops.update((list) =>
      list.map((s) =>
        s.id === shopId ? { ...s, reviews: [newReview, ...s.reviews] } : s,
      ),
    );
  }

  createPost(data: Omit<BlogPost, 'id' | 'slug' | 'createdAt'>): BlogPost {
    const post: BlogPost = {
      ...data,
      id: uid(),
      slug: this.uniqueSlug(slugify(data.title), 'post'),
      createdAt: new Date().toISOString(),
    };
    this._posts.update((list) => [post, ...list]);
    return post;
  }

  updatePost(id: string, patch: Partial<Omit<BlogPost, 'id' | 'createdAt'>>): void {
    this._posts.update((list) =>
      list.map((p) => {
        if (p.id !== id) return p;
        const next = { ...p, ...patch };
        if (patch.title && patch.title !== p.title) {
          next.slug = this.uniqueSlug(slugify(patch.title), 'post', id);
        }
        return next;
      }),
    );
  }

  deletePost(id: string): void {
    this._posts.update((list) => list.filter((p) => p.id !== id));
  }

  duplicatePost(id: string): void {
    const original = this._posts().find((p) => p.id === id);
    if (!original) return;
    const copy: BlogPost = {
      ...original,
      id: uid(),
      title: `${original.title} (másolat)`,
      slug: this.uniqueSlug(slugify(`${original.title}-masolat`), 'post'),
      createdAt: new Date().toISOString(),
    };
    this._posts.update((list) => [copy, ...list]);
  }

  resetSeed(): void {
    this._shops.set(structuredClone(SEED_SHOPS));
    this._posts.set(structuredClone(SEED_POSTS));
  }

  private uniqueSlug(
    base: string,
    kind: 'shop' | 'post',
    keepId?: string,
  ): string {
    const all =
      kind === 'shop'
        ? this._shops().map((s) => ({ id: s.id, slug: s.slug }))
        : this._posts().map((p) => ({ id: p.id, slug: p.slug }));
    let candidate = base;
    let n = 2;
    while (all.some((x) => x.slug === candidate && x.id !== keepId)) {
      candidate = `${base}-${n++}`;
    }
    return candidate;
  }

  private loadShops(): CakeShop[] {
    try {
      const raw = localStorage.getItem(SHOPS_KEY);
      if (raw) return JSON.parse(raw) as CakeShop[];
    } catch {
      /* ignore */
    }
    return structuredClone(SEED_SHOPS);
  }

  private loadPosts(): BlogPost[] {
    try {
      const raw = localStorage.getItem(POSTS_KEY);
      if (raw) return JSON.parse(raw) as BlogPost[];
    } catch {
      /* ignore */
    }
    return structuredClone(SEED_POSTS);
  }
}
