import { TestBed } from '@angular/core/testing';

import { HelperKeepService } from './helper-keep.service';

describe('HelperKeepService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HelperKeepService = TestBed.get(HelperKeepService);
    expect(service).toBeTruthy();
  });
});
