import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoSelectorComponent } from './documento-selector.component';

describe('DocumentoSelectorComponent', () => {
  let component: DocumentoSelectorComponent;
  let fixture: ComponentFixture<DocumentoSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentoSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
