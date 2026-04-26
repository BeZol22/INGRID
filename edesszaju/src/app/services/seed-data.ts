import { BlogPost, CakeShop } from '../models';

const placeholder = (seed: string, hue: number) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'>
      <defs>
        <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
          <stop offset='0%' stop-color='hsl(${hue},70%,80%)'/>
          <stop offset='100%' stop-color='hsl(${(hue + 40) % 360},65%,55%)'/>
        </linearGradient>
      </defs>
      <rect width='800' height='500' fill='url(#g)'/>
      <text x='50%' y='52%' font-family='Georgia, serif' font-size='90'
            fill='rgba(255,255,255,0.85)' text-anchor='middle'
            font-weight='700' letter-spacing='2'>${seed}</text>
    </svg>`,
  )}`;

export const SEED_SHOPS: CakeShop[] = [
  {
    id: 's1',
    slug: 'auguszt-cukraszda',
    name: 'Auguszt Cukrászda',
    city: 'Budapest',
    address: 'Kossuth Lajos utca 14-16.',
    description:
      'A főváros egyik legrégibb családi cukrászdája 1870 óta. Klasszikus magyar és francia desszertek, házi készítésű krémesek és Dobos-tortájuk legendás.',
    imageUrl: placeholder('Auguszt', 340),
    specialties: ['Dobos torta', 'Krémes', 'Eszterházy'],
    priceRange: '$$',
    openingHours: 'H-V: 09:00 - 19:00',
    phone: '+36 1 337 6379',
    website: 'auguszt.hu',
    featured: true,
    createdAt: new Date('2024-01-12').toISOString(),
    reviews: [
      {
        id: 'r1',
        author: 'Kovács Petra',
        rating: 5,
        comment: 'A krémesük egyszerűen verhetetlen. Mindig hazaviszek belőle.',
        createdAt: new Date('2025-09-12').toISOString(),
      },
      {
        id: 'r2',
        author: 'Szabó Bence',
        rating: 4,
        comment: 'Hangulatos hely, kedves kiszolgálás. A Dobos torta mestermű.',
        createdAt: new Date('2025-11-04').toISOString(),
      },
    ],
  },
  {
    id: 's2',
    slug: 'gerbeaud',
    name: 'Gerbeaud Ház',
    city: 'Budapest',
    address: 'Vörösmarty tér 7-8.',
    description:
      'A Vörösmarty tér ikonikus cukrászdája. Csillogó vitrin, klasszikus bécsi és pesti desszertek, kiváló kávé. Turistáknak és helyieknek egyaránt élmény.',
    imageUrl: placeholder('Gerbeaud', 20),
    specialties: ['Gerbeaud szelet', 'Sacher torta', 'Kakaós csiga'],
    priceRange: '$$$',
    openingHours: 'H-V: 09:00 - 21:00',
    phone: '+36 1 429 9000',
    website: 'gerbeaud.hu',
    featured: true,
    createdAt: new Date('2024-02-04').toISOString(),
    reviews: [
      {
        id: 'r3',
        author: 'Nagy Katalin',
        rating: 5,
        comment: 'Történelmi hangulat, kifogástalan minőség. Egy kicsit drága, de megéri.',
        createdAt: new Date('2025-10-22').toISOString(),
      },
    ],
  },
  {
    id: 's3',
    slug: 'szamos-marcipan',
    name: 'Szamos Marcipán',
    city: 'Szentendre',
    address: 'Dumtsa Jenő utca 12.',
    description:
      'A Szamos család marcipánkészítő hagyománya 1935 óta él. Saját készítésű marcipán figurák, torták és bonbonok, múzeummal egybekötve.',
    imageUrl: placeholder('Szamos', 280),
    specialties: ['Marcipán figura', 'Marcipán torta', 'Bonbon'],
    priceRange: '$$',
    openingHours: 'H-V: 10:00 - 18:00',
    phone: '+36 26 310 545',
    website: 'szamos.hu',
    featured: false,
    createdAt: new Date('2024-03-19').toISOString(),
    reviews: [
      {
        id: 'r4',
        author: 'Tóth Anna',
        rating: 5,
        comment: 'A marcipán múzeum csodás, a torta isteni. Gyerekekkel is tökéletes.',
        createdAt: new Date('2025-08-30').toISOString(),
      },
    ],
  },
  {
    id: 's4',
    slug: 'mihalyi-patisserie',
    name: 'Mihályi Patisserie',
    city: 'Budapest',
    address: 'Bartók Béla út 25.',
    description:
      'Modern francia ihletésű patisserie a XI. kerületben. Mihályi Bea kreatív sütijei, minimalista design, kiváló kávé.',
    imageUrl: placeholder('Mihályi', 320),
    specialties: ['Mille-feuille', 'Macaron', 'Choux'],
    priceRange: '$$$',
    openingHours: 'K-V: 10:00 - 19:00',
    phone: '+36 30 123 4567',
    website: 'mihalyipatisserie.com',
    featured: true,
    createdAt: new Date('2024-05-02').toISOString(),
    reviews: [],
  },
  {
    id: 's5',
    slug: 'molnar-cukraszda-szeged',
    name: 'Molnár Cukrászda',
    city: 'Szeged',
    address: 'Klauzál tér 5.',
    description:
      'Szeged szívében, családi vállalkozásként három generáció óta. Híres a házi készítésű somlóijukról és a friss gyümölcsös sütikről.',
    imageUrl: placeholder('Molnár', 180),
    specialties: ['Somlói galuska', 'Gyümölcstorta', 'Túrós batyu'],
    priceRange: '$',
    openingHours: 'H-Szo: 08:00 - 18:00',
    phone: '+36 62 555 123',
    website: 'molnarcukraszda.hu',
    featured: false,
    createdAt: new Date('2024-06-15').toISOString(),
    reviews: [
      {
        id: 'r5',
        author: 'Horváth László',
        rating: 4,
        comment: 'Megfizethető és finom. A somlói az egyik legjobb, amit valaha ettem.',
        createdAt: new Date('2025-07-09').toISOString(),
      },
    ],
  },
  {
    id: 's6',
    slug: 'edes-mignon',
    name: 'Édes Mignon',
    city: 'Debrecen',
    address: 'Piac utca 32.',
    description:
      'Apró, hangulatos cukrászda Debrecen belvárosában. Saját receptúra szerinti mignonok, házi limonádék és különleges szezonális desszertek.',
    imageUrl: placeholder('Mignon', 30),
    specialties: ['Mignon', 'Pavlova', 'Túró rudi torta'],
    priceRange: '$$',
    openingHours: 'H-Szo: 09:00 - 20:00',
    phone: '+36 52 444 222',
    website: 'edesmignon.hu',
    featured: false,
    createdAt: new Date('2024-08-22').toISOString(),
    reviews: [],
  },
];

export const SEED_POSTS: BlogPost[] = [
  {
    id: 'p1',
    slug: 'a-tokeletes-dobos-torta-titkai',
    title: 'A tökéletes Dobos torta titkai',
    excerpt:
      'Hogyan készül a magyar cukrászat egyik legismertebb remekműve? Megnéztük közelről és beszéltünk a szakemberekkel.',
    content:
      'A Dobos torta története egészen 1885-ig nyúlik vissza, amikor Dobos C. József bemutatta különleges, hat tojáslapos, csokoládékrémes alkotását. A titok a karamellizált tetőlap pontos hőmérsékletében és a krém selymes állagában rejlik.\n\nA hagyományos recept szerint a piskótalapokat vékonyra kell sütni, hogy a krém íze ne tűnjön el. A csokoládékrémhez kizárólag minőségi vajat és valódi étcsokoládét érdemes használni. A karamell elkészítésénél pedig a türelem kulcsfontosságú: ha túl sokáig melegítjük, megkeseredik.\n\nA modern cukrászdák gyakran saját variációt készítenek belőle - láttunk már mogyorós, pisztáciás és akár whiskeyvel ízesített változatot is. A klasszikus azonban örök.',
    author: 'Kiss Réka',
    coverImageUrl: placeholder('Dobos', 35),
    tags: ['recept', 'klasszikus', 'torta'],
    publishedAt: new Date('2026-03-12').toISOString(),
    createdAt: new Date('2026-03-12').toISOString(),
  },
  {
    id: 'p2',
    slug: 'budapest-top-5-uj-cukraszda',
    title: 'Budapest TOP 5 új cukrászdája 2026-ban',
    excerpt:
      'Új generáció érkezett a fővárosi édesség-szcénába. Bemutatjuk az öt legizgalmasabb új cukrászdát.',
    content:
      'Az elmúlt évben egészen különleges helyek nyíltak Budapesten. Egyre több fiatal cukrász tér haza külföldi tanulmányútjáról, és frissességet hoznak a hazai hagyományba.\n\n1. Sopron utcai Manufaktúra - Vegán fókuszú cukrászda, ahol a klasszikusokat is állati termék nélkül készítik.\n\n2. Kortárs Édes - Skandináv minimalizmus és magyar alapanyagok keveréke a XIII. kerületben.\n\n3. Buda Bonbon - Kézműves bonbonok és hidegen sajtolt csokoládék, kis butikban a Krisztinavárosban.\n\n4. Tortaművek - Egyedi, megrendelésre készült művészi torták, akár 3D nyomtatott elemekkel.\n\n5. Reggeli Macaron - Francia hagyomány, magyar ízekkel: bodzás, mákos és túró rudis macaronok.',
    author: 'Tóth Eszter',
    coverImageUrl: placeholder('Top 5', 320),
    tags: ['ajánló', 'budapest', '2026'],
    publishedAt: new Date('2026-04-02').toISOString(),
    createdAt: new Date('2026-04-02').toISOString(),
  },
  {
    id: 'p3',
    slug: 'szezon-tavaszi-desszertek',
    title: 'Tavaszi desszertek - mit kóstoljunk most?',
    excerpt:
      'Ahogy felmelegszik az idő, a cukrászdák is váltanak. Friss gyümölcsök, könnyebb krémek, virág-illatú csemegék.',
    content:
      'Április a legszebb hónap a cukrászdákban: a tél nehéz krémeit felváltják a könnyű, gyümölcsös változatok. Az eperszezon kezdetével mindenhol felbukkan az eperhabos krémes és a friss epres pavlova.\n\nA bodza is fontos szerepet játszik: a magyar cukrászati hagyományban a bodza-virágszörp régi alapanyag, és most reneszánszát éli a fine dining desszerteknek köszönhetően.\n\nNe hagyjuk ki a rebarbara-tortát sem - savanykás, frissítő, és pont passzol egy verőfényes délutáni kávéhoz.',
    author: 'Kiss Réka',
    coverImageUrl: placeholder('Tavasz', 110),
    tags: ['szezon', 'tavasz', 'gyümölcs'],
    publishedAt: new Date('2026-04-18').toISOString(),
    createdAt: new Date('2026-04-18').toISOString(),
  },
];
