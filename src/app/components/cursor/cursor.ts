import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { CursorService } from '../../services/cursor';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-cursor',
  imports: [NgClass],
  template: `
    @if(!isTouchDevice){
      <div
        class="fixed z-9999 w-[.7em] h-[.7em] bg-(--color-lime) rounded-2xl transition-transform duration-100 ease-linear mix-blend-difference pointer-events-none"
        [ngClass]="{'w-[1.5em] h-[1.5em]': isHover()}"
        #cursor
      ></div>
    }
  `
})
export class Cursor implements AfterViewInit, OnDestroy{
  private readonly cursorService = inject(CursorService);
  protected isHover = this.cursorService.isHovering;
  @ViewChild('cursor') cursor!: ElementRef;

  protected readonly isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  ngAfterViewInit(): void {
    if(this.isTouchDevice) return;
    document.addEventListener('mousemove', this.positionCursor);
  }

  ngOnDestroy(): void {
    document.removeEventListener('mouseover', this.positionCursor);
  }

  private positionCursor = (e: MouseEvent) => {
    const posX = this.isHover() ? e.clientX - 12 : e.clientX - 5;
    const posY = this.isHover() ? e.clientY - 12 : e.clientY - 5;

    this.cursor.nativeElement.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
  };
}
