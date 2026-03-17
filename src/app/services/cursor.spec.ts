import { TestBed } from '@angular/core/testing';

import { CursorService } from './cursor';

describe('Cursor', () => {
  let service: CursorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
