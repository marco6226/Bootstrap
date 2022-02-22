import { TestBed } from '@angular/core/testing';

import { ContextoOrganizacionService } from './contexto-organizacion.service';

describe('ContextoOrganizacionService', () => {
  let service: ContextoOrganizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContextoOrganizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
