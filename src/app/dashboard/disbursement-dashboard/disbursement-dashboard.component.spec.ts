import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisbursementDashboardComponent } from './disbursement-dashboard.component';

describe('DisbursementDashboardComponent', () => {
  let component: DisbursementDashboardComponent;
  let fixture: ComponentFixture<DisbursementDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisbursementDashboardComponent]
    });
    fixture = TestBed.createComponent(DisbursementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
