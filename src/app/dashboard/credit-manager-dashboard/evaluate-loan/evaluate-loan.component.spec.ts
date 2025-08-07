import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateLoanComponent } from './evaluate-loan.component';

describe('EvaluateLoanComponent', () => {
  let component: EvaluateLoanComponent;
  let fixture: ComponentFixture<EvaluateLoanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluateLoanComponent]
    });
    fixture = TestBed.createComponent(EvaluateLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
