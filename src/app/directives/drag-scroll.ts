import { AfterViewInit, Directive, ElementRef, inject, OnDestroy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CursorService } from '../services/cursor';

@Directive({
  selector: '[appDragScroll]',
  host: { '[class.cursor-dragging]': 'isDragging()' },
})
export class DragScroll implements AfterViewInit, OnDestroy {
  public readonly cursorService = inject(CursorService);
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly router = inject(Router);
  private cards: HTMLElement[] = [];

  private position: number = 0;
  private velocity: number = 0;
  private smoothPos: number = 0;
  private rafId: number = 0;

  private readonly autoSpeed: number = 0.4;
  private readonly friction: number = 0.88;
  private readonly wheelMultiplier: number = 0.1;
  private readonly lerpSpeed: number = 0.12;
  private readonly gap: number = 16;

  public isDragging = signal(false);
  private lastX: number = 0;
  private lastDelta: number = 0;

  private cardWidth: number = 0;
  private totalCardsWidth: number = 0;


  ngAfterViewInit(): void {
    this.cloneCards();
    this.cards = Array.from(this.el.nativeElement.querySelectorAll('.card'));
    this.cardWidth = this.cards[0].offsetWidth + this.gap;
    this.totalCardsWidth = this.cardWidth * this.cards.length;

    const host = this.el.nativeElement;
    host.addEventListener('wheel', this.onWheel, { passive: false });
    host.addEventListener('click', this.navigateToProject);

    this.el.nativeElement
      .querySelectorAll('a')
      .forEach((item: HTMLElement) =>
        item.addEventListener('mouseenter', () => this.cursorService.setHover(true)),
      );
    this.el.nativeElement
      .querySelectorAll('a')
      .forEach((item: HTMLElement) =>
        item.addEventListener('mouseleave', () => this.cursorService.setHover(false)),
      );

    host.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);

    this.animate();
  }

  ngOnDestroy(): void {
    const host = this.el.nativeElement;
    host.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);

    this.cursorService.setHover(false);

    cancelAnimationFrame(this.rafId);
  }

  private onMouseDown = (e: MouseEvent) => {
    this.isDragging.set(true);
    this.lastX = e.clientX;
    this.lastDelta = 0;

    document.body.style.cursor = 'grabbing';
  };

  private onMouseMove = (e: MouseEvent) => {
    if (!this.isDragging()) return;

    const delta = e.clientX - this.lastX;
    this.lastX = e.clientX;
    this.lastDelta = delta;

    this.position -= delta;
    this.smoothPos = this.position;
  };

  private onMouseUp = () => {
    if (!this.isDragging()) return;
    this.isDragging.set(false);

    this.velocity = -this.lastDelta * 2.5;

    document.body.style.cursor = '';
  };

  private cloneCards() {
    const originalCards = Array.from(
      this.el.nativeElement.querySelectorAll('.card'),
    ) as HTMLElement[];

    const inner = this.el.nativeElement.querySelector('.track') as HTMLElement;

    for (let i = 0; i < 2; i++)
      originalCards.forEach((card: any) => inner.appendChild(card.cloneNode(true)));
  }

  private navigateToProject = (e: MouseEvent) => {
    const card = (e.target as HTMLElement).closest('[data-id]');
    if (!card) return;

    e.preventDefault();

    this.router.navigate(['/project', card.getAttribute('data-id')]);
  };

  private onWheel = (e: WheelEvent) => {
    e.preventDefault();
    this.velocity += e.deltaY * this.wheelMultiplier;
  };

  private wrap(x: number): number {
    return (
      (((x % this.totalCardsWidth) + this.totalCardsWidth) % this.totalCardsWidth) - this.cardWidth
    );
  }

  private animate = () => {
    this.rafId = requestAnimationFrame(this.animate);

    this.velocity *= this.friction;
    this.position += this.velocity + this.autoSpeed;

    if (!this.isDragging()) {
      this.velocity *= this.friction;

      this.position += this.velocity + this.autoSpeed;
    }

    this.smoothPos += (this.position - this.smoothPos) * this.lerpSpeed;

    for (let i = 0; i < this.cards.length; i++) {
      let x = this.wrap(i * this.cardWidth - this.smoothPos);

      this.cards[i].style.transform = `translateX(${x}px) translateY(-50%)`;
    }
  };
}