import { TestBed } from '@angular/core/testing';

import { EvaluacionDesempenoService } from './evaluacion-desempeno.service';

describe('EvaluacionDesempenoService', () => {
  let service: EvaluacionDesempenoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluacionDesempenoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
