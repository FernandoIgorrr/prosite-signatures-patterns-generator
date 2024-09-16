import { TestBed } from '@angular/core/testing';

import { ListProcessingService } from './list-processing.service';

describe('ListProcessingService', () => {
  let service: ListProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
