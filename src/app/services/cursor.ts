import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CursorService {
  public isHovering = signal(false);

  public setHover(state: boolean) {
    this.isHovering.set(state);
  }
}
