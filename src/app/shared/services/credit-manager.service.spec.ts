import { TestBed } from '@angular/core/testing';

import { CreditManagerService } from './credit-manager.service';

describe('CreditManagerService', () => {
  let service: CreditManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
