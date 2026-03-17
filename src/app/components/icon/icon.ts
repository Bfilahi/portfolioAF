import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  imports: [],
  template: `
    <img src="icons/{{ name }}" alt="{{ name }}" width="30" height="30">
  `,
})
export class Icon {
  @Input() name: string = '';
}
