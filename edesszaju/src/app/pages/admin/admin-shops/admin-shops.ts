import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'page-admin-shops',
  imports: [RouterLink, DatePipe],
  templateUrl: './admin-shops.html',
  styleUrl: './admin-shops.scss',
})
export class AdminShopsPage {
  protected readonly data = inject(DataService);
  protected readonly query = signal('');

  protected readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.data.shops();
    return this.data.shops().filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.specialties.some((sp) => sp.toLowerCase().includes(q)),
    );
  });

  protected duplicate(id: string) {
    this.data.duplicateShop(id);
  }

  protected remove(s: { id: string; name: string }) {
    if (confirm(`Biztosan törlöd: "${s.name}"?`)) {
      this.data.deleteShop(s.id);
    }
  }

  protected asInput(e: Event): HTMLInputElement {
    return e.target as HTMLInputElement;
  }
}
