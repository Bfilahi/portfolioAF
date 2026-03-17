import { AfterViewInit, Component, ElementRef, inject, QueryList, ViewChildren } from '@angular/core';
import { Icon } from "../../icon/icon";
import { TitleCasePipe } from '@angular/common';
import { Reveal } from '../../../services/reveal';


@Component({
  selector: 'app-about',
  imports: [Icon, TitleCasePipe],
  host: {
    class: 'block min-h-screen flex items-center justify-center',
  },
  template: `
    <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 max-w-200 pt-[9vh] w-full p-4 mx-auto">
      <div class="flex flex-col justify-start gap-4">
        <div class="overflow-hidden">
          <small class="text-(--color-lime) italic inline-block py-4" #anim>// about me</small>
        </div>
        <h1 class="capitalize font-bold text-5xl sm:text-7xl leading-10 sm:leading-15">
          <span class="overflow-hidden inline-block"
            ><span class="inline-block font-changa" #anim>design &</span></span
          >
          <br />
          <span class="overflow-hidden inline-block"
            ><span class="text-(--color-lime) inline-block font-changa" #anim>code,</span></span
          >
          <br />
          <span class="overflow-hidden inline-block"
            ><span class="inline-block font-changa" #anim>unified.</span></span
          >
        </h1>
        <div class="overflow-hidden">
          <p class="text-(--color-gray-2) max-w-[45ch]" #anim>
            I am a junior Software Developer with a passion for building beautiful and user-friendly
            websites. I have a good understanding of both front-end and back-end development, and I
            am excited to put my skills to use in a professional setting. I am a quick learner and a
            team player, and I am confident I can be a valuable asset to any web development team.
          </p>
        </div>
      </div>

      <div class="space-y-1">
        @for (icon of iconNames; track $index) {
          <div class="overflow-hidden">
            <div
              #anim
              class="p-2 flex items-center gap-4 group border border-(--color-gray) translate-y-75 min-w-60 hover:border-(--color-lime) transition-border duration-300 ease-in"
            >
              <app-icon
                [name]="icon"
                class="saturate-0 group-hover:saturate-100 transition-saturate duration-300 ease-in"
              />
              <h4 class="font-semibold">{{ icon.substring(0, icon.indexOf('.')) | titlecase }}</h4>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class About implements AfterViewInit {
  @ViewChildren('anim') anim!: QueryList<ElementRef>;

  private readonly revealService = inject(Reveal);

  public iconNames: string[] = [
    'html.svg',
    'css.svg',
    'javascript.svg',
    'angular.svg',
    'typescript.svg',
    'java.svg',
    'spring.svg',
    'postgresql.svg',
  ];

  ngAfterViewInit(): void {
    const animElements = this.anim.map((item) => item.nativeElement);
    this.revealService.play(animElements);
  }
}
