import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Icon, IconName } from '../components/icon';

type MenuKey = 'shops' | 'recipes' | 'community';

interface MegaLink {
  icon: IconName;
  label: string;
  desc: string;
  href: string;
  queryParams?: Record<string, string>;
}

interface MegaGroup {
  title: string;
  links: MegaLink[];
}

interface MegaPromo {
  badge: string;
  title: string;
  text: string;
  href: string;
  cta: string;
}

interface MegaMenu {
  groups: MegaGroup[];
  promo: MegaPromo;
}

interface NavItem {
  key: MenuKey;
  label: string;
}

@Component({
  selector: 'site-header',
  imports: [RouterLink, RouterLinkActive, Icon],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  protected readonly mobileOpen = signal(false);
  protected readonly submenu = signal<MenuKey | null>(null);

  protected readonly navOrder: NavItem[] = [
    { key: 'shops', label: 'Felfedezés' },
    { key: 'recipes', label: 'Receptek' },
    { key: 'community', label: 'Közösség' },
  ];

  protected readonly menus: Record<MenuKey, MegaMenu> = {
    shops: {
      groups: [
        {
          title: 'Felfedezés',
          links: [
            {
              icon: 'store',
              label: 'Összes cukrászda',
              desc: 'Böngéssz a teljes listában és találd meg a kedvenced.',
              href: '/cukraszdak',
            },
            {
              icon: 'map-pin',
              label: 'Budapesti cukrászdák',
              desc: 'A főváros legjobb klasszikus és modern helyei.',
              href: '/cukraszdak',
              queryParams: { v: 'Budapest' },
            },
            {
              icon: 'navigation',
              label: 'Térképes nézet',
              desc: 'Cukrászdák a Google Térképen, egy kattintás távolságra.',
              href: '/cukraszdak/terkep',
            },
            {
              icon: 'sparkle',
              label: 'Új ajánlások',
              desc: 'Frissen érkezett, közösség által kipróbált helyek.',
              href: '/cukraszdak',
            },
          ],
        },
        {
          title: 'Specialitások',
          links: [
            {
              icon: 'cake',
              label: 'Klasszikus magyar',
              desc: 'Dobos, Eszterházy, Krémes, Somlói galuska.',
              href: '/cukraszdak',
            },
            {
              icon: 'heart',
              label: 'Francia desszert',
              desc: 'Macaron, mille-feuille, choux és pâtisserie.',
              href: '/cukraszdak',
            },
            {
              icon: 'tag',
              label: 'Marcipán műhely',
              desc: 'Kézzel formázott figurák és bonbonok.',
              href: '/cukraszdak',
            },
            {
              icon: 'sparkle',
              label: 'Modern alkotások',
              desc: 'Kísérletező cukrászok és új ízpárosítások.',
              href: '/cukraszdak',
            },
          ],
        },
        {
          title: 'Toplisták',
          links: [
            {
              icon: 'star',
              label: 'Legjobb értékelések',
              desc: 'A közösség által legtöbbre tartott cukrászdák.',
              href: '/cukraszdak',
            },
            {
              icon: 'chart',
              label: 'Heti kedvencek',
              desc: 'Legtöbbet olvasott és mentett helyek.',
              href: '/cukraszdak',
            },
            {
              icon: 'clock',
              label: 'Most nyitva',
              desc: 'Cukrászdák, ahol most leülhetsz egy süteményre.',
              href: '/cukraszdak',
            },
            {
              icon: 'plus',
              label: 'Cukrászda regisztráció',
              desc: 'Tedd fel a saját helyed a térképre.',
              href: '/admin/belepes',
            },
          ],
        },
      ],
      promo: {
        badge: 'A hét cukrászdája',
        title: 'Auguszt Cukrászda',
        text: '1870 óta a klasszikus magyar desszertek mestere — a Dobos és a krémes mindig hibátlan.',
        href: '/cukraszdak/auguszt-cukraszda',
        cta: 'Megnézem',
      },
    },
    recipes: {
      groups: [
        {
          title: 'Témák',
          links: [
            {
              icon: 'book',
              label: 'Receptek',
              desc: 'Kipróbált, lépésről lépésre vezetett desszertek.',
              href: '/blog',
            },
            {
              icon: 'star-outline',
              label: 'Cukrászda ajánlók',
              desc: 'Helyek, történetek, kulisszatitkok.',
              href: '/blog',
            },
            {
              icon: 'users',
              label: 'Interjúk',
              desc: 'Cukrászok, alapítók és vendégszerzők.',
              href: '/blog',
            },
            {
              icon: 'sparkle',
              label: 'Szezonális tartalom',
              desc: 'Tavasz, nyár, ősz, tél — szezonok ízei.',
              href: '/blog',
            },
          ],
        },
        {
          title: 'Klasszikus desszertek',
          links: [
            {
              icon: 'cake',
              label: 'Dobos torta',
              desc: 'A magyar cukrászat ikonja eredeti receptúrával.',
              href: '/blog',
            },
            {
              icon: 'cake',
              label: 'Krémes',
              desc: 'A vaníliakrém és a leveles tészta szerelme.',
              href: '/blog',
            },
            {
              icon: 'cake',
              label: 'Eszterházy',
              desc: 'Mandulás-konyakos rétegek finom hangsúlyokkal.',
              href: '/blog',
            },
            {
              icon: 'cake',
              label: 'Somlói galuska',
              desc: 'Három tészta, három íz, egy tökéletes kanál.',
              href: '/blog',
            },
          ],
        },
        {
          title: 'Tippek és technikák',
          links: [
            {
              icon: 'pencil',
              label: 'Alaptechnikák',
              desc: 'Tojásfehérje-hab, karamell, csokoládé temperálás.',
              href: '/blog',
            },
            {
              icon: 'tag',
              label: 'Krémek és töltelékek',
              desc: 'Tartós, selymes és könnyű krémek receptjei.',
              href: '/blog',
            },
            {
              icon: 'sparkle',
              label: 'Díszítés és tálalás',
              desc: 'Ahogy a profik csinálják — otthon is.',
              href: '/blog',
            },
            {
              icon: 'heart',
              label: 'Allergénmentes desszertek',
              desc: 'Glutén- és laktózmentes finomságok.',
              href: '/blog',
            },
          ],
        },
      ],
      promo: {
        badge: 'A hét receptje',
        title: 'Eredeti Dobos torta',
        text: 'Hat lapból, csokoládévajkrémmel és tükörsima karamellel — pontosan úgy, ahogy 1885-ben.',
        href: '/blog',
        cta: 'Olvasom',
      },
    },
    community: {
      groups: [
        {
          title: 'Rólunk',
          links: [
            {
              icon: 'cake',
              label: 'Történetünk',
              desc: 'Hogyan lett egy süteményrajongó csapatból közösség.',
              href: '/rolunk',
            },
            {
              icon: 'users',
              label: 'A csapat',
              desc: 'Szerzők, szerkesztők és vendégcukrászok.',
              href: '/rolunk',
            },
            {
              icon: 'globe',
              label: 'Sajtó és média',
              desc: 'Idézhető anyagok, logók, kapcsolat újságírók részére.',
              href: '/rolunk',
            },
            {
              icon: 'mail',
              label: 'Kapcsolat',
              desc: 'Írj nekünk visszajelzést, ötletet vagy ajánlást.',
              href: '/rolunk',
            },
          ],
        },
        {
          title: 'Részvétel',
          links: [
            {
              icon: 'plus',
              label: 'Cukrászda regisztráció',
              desc: 'Add hozzá a kedvenc vagy saját cukrászdád.',
              href: '/admin/belepes',
            },
            {
              icon: 'pencil',
              label: 'Vélemény írása',
              desc: 'Oszd meg a tapasztalataid másokkal.',
              href: '/cukraszdak',
            },
            {
              icon: 'mail',
              label: 'Hírlevél',
              desc: 'Heti összefoglaló receptekkel és ajánlókkal.',
              href: '/rolunk',
            },
            {
              icon: 'heart',
              label: 'Önkéntesek és szerzők',
              desc: 'Csatlakozz vendégszerzőként a tartalomhoz.',
              href: '/rolunk',
            },
          ],
        },
        {
          title: 'Segítség',
          links: [
            {
              icon: 'book',
              label: 'GYIK',
              desc: 'Gyakori kérdések a regisztrációról és értékelésről.',
              href: '/rolunk',
            },
            {
              icon: 'check',
              label: 'Közösségi szabályok',
              desc: 'Mit várunk el a hozzászólóktól és cukrászdáktól.',
              href: '/rolunk',
            },
            {
              icon: 'globe',
              label: 'Adatvédelem',
              desc: 'Hogyan kezeljük a felhasználóink adatait.',
              href: '/rolunk',
            },
            {
              icon: 'phone',
              label: 'Hibajelentés',
              desc: 'Találtál hibát? Egy kattintás és tudjuk.',
              href: '/rolunk',
            },
          ],
        },
      ],
      promo: {
        badge: 'Csatlakozz!',
        title: 'Légy te is része',
        text: 'Regisztrálj cukrászdaként vagy szerzőként, és segíts felfedezhetővé tenni a magyar édesszáj-kultúrát.',
        href: '/admin/belepes',
        cta: 'Kezdjük el',
      },
    },
  };

  constructor(protected readonly auth: AuthService) {}

  toggleMobile() {
    this.mobileOpen.update((v) => !v);
    if (!this.mobileOpen()) this.submenu.set(null);
  }

  closeMobile() {
    this.mobileOpen.set(false);
    this.submenu.set(null);
  }

  openSubmenu(key: MenuKey) {
    this.submenu.set(key);
  }

  toggleSubmenu(key: MenuKey) {
    this.submenu.update((v) => (v === key ? null : key));
  }

  closeAll() {
    this.submenu.set(null);
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.closeAll();
    this.closeMobile();
  }
}
