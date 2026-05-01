import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../components/icon/icon';

@Component({
  selector: 'site-footer',
  imports: [RouterLink, Icon],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
})
export class SiteFooter {
  readonly year = new Date().getFullYear();
}
