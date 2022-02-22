import { TestBed } from '@angular/core/testing';

import { TipoAreaService } from './tipo-area.service';

describe('TipoAreaService', () => {
  let service: TipoAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
