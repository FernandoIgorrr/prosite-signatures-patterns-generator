import { TestBed } from '@angular/core/testing';

import { PrositeProcessingService } from './prosite-processing.service';

describe('PrositeProcessingService', () => {
  let service: PrositeProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrositeProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
