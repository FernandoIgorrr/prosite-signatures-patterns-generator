import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyMatrixCalculatorComponent } from './frequency-matrix-calculator.component';

describe('FrequencyMatrixCalculatorComponent', () => {
  let component: FrequencyMatrixCalculatorComponent;
  let fixture: ComponentFixture<FrequencyMatrixCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrequencyMatrixCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrequencyMatrixCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
