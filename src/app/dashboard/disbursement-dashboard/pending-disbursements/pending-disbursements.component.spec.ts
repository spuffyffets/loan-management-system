import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDisbursementsComponent } from './pending-disbursements.component';

describe('PendingDisbursementsComponent', () => {
  let component: PendingDisbursementsComponent;
  let fixture: ComponentFixture<PendingDisbursementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingDisbursementsComponent]
    });
    fixture = TestBed.createComponent(PendingDisbursementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
