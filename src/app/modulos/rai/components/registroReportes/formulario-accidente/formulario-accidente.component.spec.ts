import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAccidenteComponent } from './formulario-accidente.component';

describe('FormularioAccidenteComponent', () => {
  let component: FormularioAccidenteComponent;
  let fixture: ComponentFixture<FormularioAccidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioAccidenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioAccidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
