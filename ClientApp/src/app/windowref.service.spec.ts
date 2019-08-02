import { TestBed } from '@angular/core/testing';

import { Windowref } from './windowref.service';

describe('WindowrefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Windowref = TestBed.get(Windowref);
    expect(service).toBeTruthy();
  });
});
