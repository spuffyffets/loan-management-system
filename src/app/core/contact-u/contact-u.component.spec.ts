import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUComponent } from './contact-u.component';

describe('ContactUComponent', () => {
  let component: ContactUComponent;
  let fixture: ComponentFixture<ContactUComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactUComponent]
    });
    fixture = TestBed.createComponent(ContactUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
