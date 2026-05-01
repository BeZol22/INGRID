import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DataService } from '../../services/data.service';
import { Icon } from '../../components/icon/icon';
import { Button } from '../../components/button/button';
import { CakeShop } from '../../models';

type GeoStatus = 'idle' | 'loading' | 'ok' | 'denied' | 'unavailable';
type Coords = { lat: number; lng: number };

const CITY_FALLBACK: Record<string, Coords> = {
  Budapest: { lat: 47.4979, lng: 19.0402 },
  Szentendre: { lat: 47.6695, lng: 19.078 },
  Szeged: { lat: 46.253, lng: 20.1414 },
  Debrecen: { lat: 47.5316, lng: 21.6273 },
};

@Component({
  selector: 'page-shops-map',
  imports: [RouterLink, Icon, Button],
  templateUrl: './shops-map.html',
  styleUrl: './shops-map.scss',
})
export class ShopsMapPage {
  protected readonly data = inject(DataService);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly query = signal('');
  protected readonly city = signal('');
  protected readonly selectedId = signal<string | null>(null);

  protected readonly userLocation = signal<Coords | null>(null);
  protected readonly geoStatus = signal<GeoStatus>('idle');

  protected readonly filtered = computed(() =>
    this.data.searchShops(this.query(), this.city()),
  );

  protected readonly displayed = computed<CakeShop[]>(() => {
    const list = this.filtered();
    const u = this.userLocation();
    if (!u) return list;
    return [...list].sort((a, b) => {
      const da = this.distanceKm(a) ?? Infinity;
      const db = this.distanceKm(b) ?? Infinity;
      return da - db;
    });
  });

  protected readonly selected = computed<CakeShop | null>(() => {
    const list = this.displayed();
    const id = this.selectedId();
    return list.find((s) => s.id === id) ?? list[0] ?? null;
  });

  protected readonly mapUrl = computed<SafeResourceUrl>(() => {
    const shop = this.selected();
    const q = shop
      ? `${shop.name}, ${shop.address}, ${shop.city}, Magyarország`
      : 'cukrászda, Budapest, Magyarország';
    const url = `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });

  protected readonly directionsUrl = computed<string>(() => {
    const shop = this.selected();
    if (!shop) return 'https://maps.google.com/';
    const q = `${shop.name}, ${shop.address}, ${shop.city}`;
    const u = this.userLocation();
    if (u) {
      return `https://maps.google.com/maps?saddr=${u.lat},${u.lng}&daddr=${encodeURIComponent(q)}`;
    }
    return `https://maps.google.com/maps?daddr=${encodeURIComponent(q)}`;
  });

  protected select(shop: CakeShop) {
    this.selectedId.set(shop.id);
  }

  protected toggleCity(c: string) {
    this.city.set(this.city() === c ? '' : c);
    this.selectedId.set(null);
  }

  protected requestLocation() {
    if (!navigator.geolocation) {
      this.geoStatus.set('unavailable');
      return;
    }
    this.geoStatus.set('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.userLocation.set({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        this.geoStatus.set('ok');
        const nearest = this.displayed()[0];
        if (nearest) this.selectedId.set(nearest.id);
      },
      (err) => {
        this.geoStatus.set(
          err.code === err.PERMISSION_DENIED ? 'denied' : 'unavailable',
        );
      },
      { timeout: 10000, maximumAge: 60000, enableHighAccuracy: false },
    );
  }

  protected clearLocation() {
    this.userLocation.set(null);
    this.geoStatus.set('idle');
    this.selectedId.set(null);
  }

  protected distanceKm(shop: CakeShop): number | null {
    const u = this.userLocation();
    if (!u) return null;
    const c = this.shopCoords(shop);
    if (!c) return null;
    return haversineKm(u, c);
  }

  protected formatDistance(km: number): string {
    if (km < 1) return `${Math.round(km * 1000)} m`;
    if (km < 10) return `${km.toFixed(1)} km`;
    return `${Math.round(km)} km`;
  }

  private shopCoords(shop: CakeShop): Coords | null {
    if (typeof shop.lat === 'number' && typeof shop.lng === 'number') {
      return { lat: shop.lat, lng: shop.lng };
    }
    return CITY_FALLBACK[shop.city] ?? null;
  }

  protected asInput(e: Event): HTMLInputElement {
    return e.target as HTMLInputElement;
  }
}

function haversineKm(a: Coords, b: Coords): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}
