import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.HomePage),
    title: 'Édesszájú - Magyarország legjobb cukrászdái',
  },
  {
    path: 'cukraszdak',
    loadComponent: () =>
      import('./pages/shops-list/shops-list').then((m) => m.ShopsListPage),
    title: 'Cukrászdák - Édesszájú',
  },
  {
    path: 'cukraszdak/:slug',
    loadComponent: () =>
      import('./pages/shop-detail/shop-detail').then((m) => m.ShopDetailPage),
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./pages/blog-list/blog-list').then((m) => m.BlogListPage),
    title: 'Blog - Édesszájú',
  },
  {
    path: 'blog/:slug',
    loadComponent: () =>
      import('./pages/blog-detail/blog-detail').then((m) => m.BlogDetailPage),
  },
  {
    path: 'rolunk',
    loadComponent: () => import('./pages/about/about').then((m) => m.AboutPage),
    title: 'Rólunk - Édesszájú',
  },
  {
    path: 'admin/belepes',
    loadComponent: () =>
      import('./pages/admin/admin-login/admin-login').then(
        (m) => m.AdminLoginPage,
      ),
    title: 'Belépés - Édesszájú admin',
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./pages/admin/admin-shell/admin-shell').then(
        (m) => m.AdminShell,
      ),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'attekintes' },
      {
        path: 'attekintes',
        loadComponent: () =>
          import('./pages/admin/admin-dashboard/admin-dashboard').then(
            (m) => m.AdminDashboardPage,
          ),
      },
      {
        path: 'cukraszdak',
        loadComponent: () =>
          import('./pages/admin/admin-shops/admin-shops').then(
            (m) => m.AdminShopsPage,
          ),
      },
      {
        path: 'cukraszdak/uj',
        loadComponent: () =>
          import('./pages/admin/admin-shop-edit/admin-shop-edit').then(
            (m) => m.AdminShopEditPage,
          ),
      },
      {
        path: 'cukraszdak/:id',
        loadComponent: () =>
          import('./pages/admin/admin-shop-edit/admin-shop-edit').then(
            (m) => m.AdminShopEditPage,
          ),
      },
      {
        path: 'blog',
        loadComponent: () =>
          import('./pages/admin/admin-posts/admin-posts').then(
            (m) => m.AdminPostsPage,
          ),
      },
      {
        path: 'blog/uj',
        loadComponent: () =>
          import('./pages/admin/admin-post-edit/admin-post-edit').then(
            (m) => m.AdminPostEditPage,
          ),
      },
      {
        path: 'blog/:id',
        loadComponent: () =>
          import('./pages/admin/admin-post-edit/admin-post-edit').then(
            (m) => m.AdminPostEditPage,
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
