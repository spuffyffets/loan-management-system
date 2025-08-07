import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanOfficerProfileComponent } from './profile.component';


describe('ProfileComponent', () => {
  let component: LoanOfficerProfileComponent;
  let fixture: ComponentFixture<LoanOfficerProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanOfficerProfileComponent]
    });
    fixture = TestBed.createComponent(LoanOfficerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
