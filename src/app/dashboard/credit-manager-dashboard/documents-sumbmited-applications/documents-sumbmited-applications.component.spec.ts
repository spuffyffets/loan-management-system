import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsSumbmitedApplicationsComponent } from './documents-sumbmited-applications.component';

describe('DocumentsSumbmitedApplicationsComponent', () => {
  let component: DocumentsSumbmitedApplicationsComponent;
  let fixture: ComponentFixture<DocumentsSumbmitedApplicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentsSumbmitedApplicationsComponent]
    });
    fixture = TestBed.createComponent(DocumentsSumbmitedApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
