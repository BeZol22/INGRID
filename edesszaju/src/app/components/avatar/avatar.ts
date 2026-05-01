import { Component, computed, input } from '@angular/core';

export type AvatarSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'none' | 'online' | 'offline';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
})
export class Avatar {
  readonly src = input<string | null>(null);
  readonly alt = input<string>('');
  readonly size = input<AvatarSize>('md');
  /** Initials fallback when `src` is missing. Auto-derived from `alt` if blank. */
  readonly initials = input<string | null>(null);
  /** Outer border + inset chrome (matches the Figma `border` boolean). */
  readonly border = input(false, { transform: Boolean });
  readonly status = input<AvatarStatus>('none');

  protected readonly resolvedInitials = computed(() => {
    const explicit = this.initials();
    if (explicit) return explicit;
    const name = this.alt().trim();
    if (!name) return '';
    return name
      .split(/\s+/)
      .slice(0, 2)
      .map(word => word[0]?.toUpperCase() ?? '')
      .join('');
  });

  protected readonly hasImage = computed(() => !!this.src());

  protected readonly rootClass = computed(() =>
    [
      'avatar',
      `avatar--${this.size()}`,
      this.border() ? 'avatar--bordered' : '',
      this.status() !== 'none' ? `avatar--status-${this.status()}` : '',
    ]
      .filter(Boolean)
      .join(' '),
  );
}
