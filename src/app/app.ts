import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { Cursor } from "./components/cursor/cursor";

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Cursor],
  template: `

    @if (!isSmall()) {
      <app-cursor />
    }
    <app-navbar />
    <router-outlet />
  `,
})
export class App implements OnInit {
  protected readonly title = signal('portfolioAF');

  private query = window.matchMedia('(max-width: 1024px)');
  public isSmall = signal<boolean>(this.query.matches);
 
  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    this.query.addEventListener('change', this.onQueryChange);
  }

  private onQueryChange = (e: MediaQueryListEvent) =>{
    this.isSmall.set(e.matches);
  }
}
