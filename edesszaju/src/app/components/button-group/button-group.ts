import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.html',
  styleUrl: './button-group.scss',
})
export class ButtonGroup {
  readonly ariaLabel = input<string | null>(null);
}
