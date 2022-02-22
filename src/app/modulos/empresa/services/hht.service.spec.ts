import { TestBed } from '@angular/core/testing';

import { HhtService } from './hht.service';

describe('HhtService', () => {
  let service: HhtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HhtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
