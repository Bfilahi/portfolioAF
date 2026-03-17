import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { CustomBtn } from '../custom-btn/custom-btn';
import { Blinker } from '../blinker/blinker';
import { Logo } from '../logo/logo';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import gsap from 'gsap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [CustomBtn, Blinker, Logo, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit, AfterViewInit, OnDestroy {
  public readonly router = inject(Router);
  public menuItems: string[] = ['projects', 'contact', 'about'];

  public isMenuOpen = signal<boolean>(false);
  private readonly query = window.matchMedia('(max-width: 700px)');
  public isSmall = signal<boolean>(this.query.matches);

  private timeline!: gsap.core.Timeline;

  @ViewChild('overlay') overlay!: ElementRef;
  @ViewChild('toggleBtn') toggleBtn!: ElementRef;
  @ViewChild('nav') nav!: ElementRef;
  @ViewChildren('anim') anim!: QueryList<ElementRef>;

  private animElements!: Element[];

  private changesSubscription!: Subscription;

  ngOnInit(): void {
    this.timeline = gsap.timeline();
    this.query.addEventListener('change', this.onQueryChange);
  }

  ngAfterViewInit(): void {
    this.changesSubscription = this.anim.changes.subscribe(() => {
      this.animElements = this.anim.map((item) => item.nativeElement);
    });
    this.animElements = this.anim.map((item) => item.nativeElement);
  }

  ngOnDestroy(): void {
    this.query.removeEventListener('change', this.onQueryChange);

    this.changesSubscription?.unsubscribe();
  }

  public toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());

    this.timeline.kill();
    this.timeline = gsap.timeline();

    this.timeline.set(this.toggleBtn.nativeElement, { pointerEvents: 'none' });
    if (this.isMenuOpen()) {
      this.openMenuAnim();
    } else {
      this.closeMenuAnim();
    }
  }

  private onQueryChange = (e: MediaQueryListEvent) => {
    this.isSmall.set(e.matches);
  };

  private openMenuAnim() {
    this.timeline
      .to(this.overlay.nativeElement, {
        scaleY: 1,
        duration: 0.6,
        ease: 'expo.in',
      })
      .to(this.nav.nativeElement, {
        display: 'flex',
      })
      .set(this.animElements, { display: 'block' })
      .to(this.animElements, {
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'expo.out',
      })
      .set(this.toggleBtn.nativeElement, { pointerEvents: 'auto' });
  }

  public closeMenuAnim() {
    this.timeline
      .to(this.animElements, {
        y: 200,
        stagger: 0.1,
        duration: 1,
        ease: 'expo.in',
      })
      .set(this.animElements, { display: 'none' })
      .to(this.nav.nativeElement, {
        display: 'none',
      })
      .to(
        this.overlay.nativeElement,
        {
          scaleY: 0,
          duration: 0.6,
          ease: 'expo.out',
        },
        '<',
      )
      .set(this.toggleBtn.nativeElement, { pointerEvents: 'auto' });
  }
}
