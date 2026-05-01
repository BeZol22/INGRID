import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogPost } from '../../models';

@Component({
  selector: 'post-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss',
})
export class PostCard {
  readonly post = input.required<BlogPost>();
}
