import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditManagerDashboardComponent } from './credit-manager-dashboard.component';

describe('CreditManagerDashboardComponent', () => {
  let component: CreditManagerDashboardComponent;
  let fixture: ComponentFixture<CreditManagerDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditManagerDashboardComponent]
    });
    fixture = TestBed.createComponent(CreditManagerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
