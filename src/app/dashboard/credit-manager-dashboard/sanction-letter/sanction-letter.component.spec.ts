import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanctionLetterComponent } from './sanction-letter.component';

describe('SanctionLetterComponent', () => {
  let component: SanctionLetterComponent;
  let fixture: ComponentFixture<SanctionLetterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SanctionLetterComponent]
    });
    fixture = TestBed.createComponent(SanctionLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
