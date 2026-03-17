import { AfterViewChecked, Component, computed, effect, ElementRef, inject, input, OnDestroy, QueryList, signal, untracked, ViewChild, ViewChildren } from '@angular/core';
import { IProject, Project } from '../../../services/project';
import { Router, RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { CursorService } from '../../../services/cursor';
import { CustomBtn } from "../../custom-btn/custom-btn";
import gsap from 'gsap';


@Component({
  selector: 'app-project-details',
  imports: [RouterLink, CustomBtn],
  host: {
    class: 'block',
  },
  templateUrl: './project-details.html',
})
export class ProjectDetails implements AfterViewChecked, OnDestroy {
  public readonly cursorService = inject(CursorService);
  private readonly projectService = inject(Project);
  private readonly router = inject(Router);
  public readonly id = input.required<string>();

  @ViewChild('background') background!: ElementRef;
  @ViewChildren('anim') anim!: QueryList<ElementRef>;

  private readonly query = window.matchMedia('(max-width: 1024px)');
  public isSmall = signal<boolean>(this.query.matches);

  public project = computed<IProject | null>(
    () => this.projectService.projects().find((p) => p.id === parseInt(this.id())) || null,
  );

  public nextProject = computed<IProject | null>(() => {
    const list = this.projectService.projects();
    const currentIndex = list.findIndex((item) => item.id === parseInt(this.id()));
    if (currentIndex === -1) return null;
    return list[(currentIndex + 1) % list.length];
  });

  public copiedData = signal<string>('');

  private timeline!: gsap.core.Timeline;
  private readonly scroller = inject(ViewportScroller);
  private viewInitiated = signal<boolean>(false);

  constructor() {
    effect(() => {
      const p = this.project();
      const ready = this.viewInitiated();

      if (p && ready) {
        this.scroller.scrollToPosition([0, 0]);

        untracked(() => this.playAnimation());
      } else if (!p) untracked(() => this.router.navigateByUrl('/'));
    });
  }

  ngAfterViewChecked(): void {
    this.viewInitiated.set(true);

    this.query.addEventListener('change', this.onQueryChange);
  }

  ngOnDestroy(): void {
    this.timeline.kill();
  }

  private onQueryChange = (e: MediaQueryListEvent) => {
    this.isSmall.set(e.matches);
  }

  public copy(text: string) {
    window.navigator.clipboard.writeText(text);
    this.copiedData.set(text);
  }

  private playAnimation() {
    if (!this.background || !this.anim.length) return;

    if (this.timeline) this.timeline.kill();

    const animElements = this.anim.map((item) => item.nativeElement);

    this.timeline = gsap.timeline({
      defaults: { ease: 'expo.out', duration: 1.2 },
    });

    this.timeline
      .set([this.background.nativeElement, ...animElements], { autoAlpha: 0 })
      .fromTo(
        this.background.nativeElement,
        { y: 1200, scale: 0.5, autoAlpha: 0 },
        { y: 0, scale: 0.5, autoAlpha: 1, duration: 1.5 },
      )
      .to(this.background.nativeElement, { scale: 1 })
      .fromTo(
        animElements,
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.1, duration: 1 },
        '-=.5',
      );
  }
}
