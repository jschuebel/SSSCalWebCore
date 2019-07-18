import { TestBed } from '@angular/core/testing';

import { WindowrefService } from './windowref.service';

describe('WindowrefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WindowrefService = TestBed.get(WindowrefService);
    expect(service).toBeTruthy();
  });
});
