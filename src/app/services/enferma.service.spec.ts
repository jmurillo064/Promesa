import { TestBed } from '@angular/core/testing';

import { EnfermaService } from './enferma.service';

describe('EnfermaService', () => {
  let service: EnfermaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnfermaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
