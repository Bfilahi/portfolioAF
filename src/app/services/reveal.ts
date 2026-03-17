import { Injectable } from '@angular/core';
import gsap from 'gsap'

@Injectable({
  providedIn: 'root',
})
export class Reveal {
  public play(animElements: HTMLElement | HTMLElement[] | NodeListOf<Element>) {
    gsap.from(animElements, {
      y: 1200,
      duration: 0.7,
      ease: 'expo.out',
      stagger: 0.2,
    });
  }
}
