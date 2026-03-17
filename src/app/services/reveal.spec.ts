import { TestBed } from '@angular/core/testing';

import { Reveal } from './reveal';

describe('Reveal', () => {
  let service: Reveal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Reveal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
