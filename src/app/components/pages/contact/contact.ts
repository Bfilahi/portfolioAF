import { AfterViewInit, Component, ElementRef, inject, QueryList, ViewChildren } from '@angular/core';
import { CursorService } from '../../../services/cursor';
import { Reveal } from '../../../services/reveal';


@Component({
  selector: 'app-contact',
  imports: [],
  template: `
    <div class="h-screen flex flex-col items-center justify-center gap-10">
      <h1 class="capitalize font-bold text-center text-6xl sm:text-8xl leading-14 sm:leading-22">
        <span class="overflow-hidden inline-block">
          <span #anim class="inline-block font-changa">let's</span>
        </span>
        <br />
        <span class="overflow-hidden inline-block">
          <span #anim class="inline-block font-changa">build</span>
        </span>
        <br />
        <span class="overflow-hidden inline-block">
          <span #anim class="inline-block text-(--color-lime) font-changa">something</span>
        </span>
      </h1>

      <div class="overflow-hidden">
        <a
          href="mailto:abdelbasset.filahi@gmail.com"
          class="italic text-sm text-(--color-gray-2) pb-1.5 border-b border-lime-600 cursor-default
          transition-all duration-300 ease-in hover:text-(--color-lime) hover:border-(--color-lime)"
          (mouseenter)="cursorService.setHover(true)"
          (mouseleave)="cursorService.setHover(false)"
        >
          <span #anim class="block">{{ socials.email }}</span>
        </a>
      </div>

      <div class="flex items-center gap-10 overflow-hidden">
        @for (item of socials.socials; track $index) {
          <a
            href="{{ item.link }}"
            target="_blank"
            class="uppercase text-sm text-(--color-gray-2)"
            (mouseenter)="cursorService.setHover(true)"
            (mouseleave)="cursorService.setHover(false)"
            #anim
            >{{ item.social }}</a
          >
        }
      </div>
    </div>
  `,
})
export class Contact implements AfterViewInit {
  @ViewChildren('anim') anim!: QueryList<ElementRef>;

  public readonly cursorService = inject(CursorService);
  private readonly revealService = inject(Reveal);

  public socials: { email: string, socials: { social: string, link: string }[] } = {
    email: 'abdelbassete.filahi@gmail.com',
    socials: [
      {
        social: 'github',
        link: 'https://github.com/Bfilahi?tab=repositories',
      },
      {
        social: 'linkedin',
        link: 'https://www.linkedin.com/in/abdelbassete-filahi-4041463aa/',
      },
      {
        social: 'instagram',
        link: 'https://www.instagram.com/f.basset/',
      }
    ],
  };

  ngAfterViewInit(): void {
    const animElements = this.anim.map((item) => item.nativeElement);
    this.revealService.play(animElements);
  }
}
