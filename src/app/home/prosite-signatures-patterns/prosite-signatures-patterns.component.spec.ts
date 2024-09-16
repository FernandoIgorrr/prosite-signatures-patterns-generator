import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrositeSignaturesPatternsComponent } from './prosite-signatures-patterns.component';

describe('PrositeSignaturesPatternsComponent', () => {
  let component: PrositeSignaturesPatternsComponent;
  let fixture: ComponentFixture<PrositeSignaturesPatternsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrositeSignaturesPatternsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrositeSignaturesPatternsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
