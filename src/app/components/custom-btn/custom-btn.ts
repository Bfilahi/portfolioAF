import { Component, HostListener, inject, input } from '@angular/core';
import { CursorService } from '../../services/cursor';


@Component({
  selector: 'app-custom-btn',
  imports: [],
  template: `
    <a
      class="uppercase font-semibold block relative text-{{ textSize() }}"
      [class.active]="isActive()"
      [class.font-changa]="fontFamily()"
    >
      <ng-content></ng-content>
    </a>
  `,
  styles: `
    a::before {
      content: '';
      position: absolute;
      z-index: 1;
      bottom: -1%;
      left: 0;
      width: 0%;
      height: 0.07em;
      background-color: var(--color-lime);
      transition: width 0.3s ease-in;
    }

    a:hover::before {
      width: 100%;
    }

    a.active {
      color: var(--color-lime);
    }

    a.active::before {
      width: 100%;
    }
  `,
})
export class CustomBtn {
  private readonly cursorService = inject(CursorService);

  public isActive = input<boolean>(false);
  public textSize = input<string>('xs');
  public fontFamily = input<boolean>(false);

  @HostListener('mouseenter') onEnter() {
    this.cursorService.setHover(true);
  }
  @HostListener('mouseleave') onLeave() {
    this.cursorService.setHover(false);
  }
}
