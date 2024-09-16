import { TestBed } from '@angular/core/testing';

import { FastaService } from './fasta.service';

describe('FastaService', () => {
  let service: FastaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FastaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
