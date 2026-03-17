import { Component } from '@angular/core';

@Component({
  selector: 'app-blinker',
  imports: [],
  template: `<div class="blinker w-1.5 h-1.5 rounded-2xl bg-(--color-lime) animate-pulse"></div>`,
})
export class Blinker {}
