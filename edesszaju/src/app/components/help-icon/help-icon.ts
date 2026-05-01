import { Component, input } from '@angular/core';
import {
  Tooltip,
  TooltipAlign,
  TooltipPlacement,
} from '../tooltip/tooltip';

@Component({
  selector: 'app-help-icon',
  imports: [Tooltip],
  templateUrl: './help-icon.html',
  styleUrl: './help-icon.scss',
})
export class HelpIcon {
  readonly text = input.required<string>();
  readonly supportingText = input<string | null>(null);
  readonly placement = input<TooltipPlacement>('top');
  readonly align = input<TooltipAlign>('center');
  readonly arrow = input(true, { transform: Boolean });
  readonly disabled = input(false, { transform: Boolean });
  readonly delay = input<number>(150);
  readonly ariaLabel = input<string>('Súgó');
}
