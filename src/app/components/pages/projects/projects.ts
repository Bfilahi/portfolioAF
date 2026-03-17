import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { DragScroll } from '../../../directives/drag-scroll';
import { Project } from '../../../services/project';
import { RouterLink } from '@angular/router';
import { Reveal } from '../../../services/reveal';


@Component({
  selector: 'app-projects',
  imports: [DragScroll, RouterLink],
  host: {
    class: 'block h-screen',
  },
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements AfterViewInit {
  public readonly projectService = inject(Project);
  private readonly revealService = inject(Reveal);

  private readonly query = window.matchMedia('(max-width: 1024px)');
  public isSmall = signal<boolean>(this.query.matches);

  ngAfterViewInit(): void {
    this.query.addEventListener('change', this.onQueryChange);

    const animElements = document.querySelectorAll('.anim__elem');
    this.revealService.play(animElements);
  }

  private onQueryChange = (e: MediaQueryListEvent) => {
    this.isSmall.set(e.matches);
  };

}
