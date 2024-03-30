import { TestBed } from '@angular/core/testing';

import { SeanceEntrainementService } from './seance-entrainement.service';

describe('SeanceEntrainementService', () => {
  let service: SeanceEntrainementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeanceEntrainementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
