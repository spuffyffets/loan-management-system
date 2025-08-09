import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisbursementHistoryComponent } from './disbursement-history.component';

describe('DisbursementHistoryComponent', () => {
  let component: DisbursementHistoryComponent;
  let fixture: ComponentFixture<DisbursementHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisbursementHistoryComponent]
    });
    fixture = TestBed.createComponent(DisbursementHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
