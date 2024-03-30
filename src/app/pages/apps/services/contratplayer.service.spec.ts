import { TestBed } from '@angular/core/testing';

import { ContratplayerService } from './contratplayer.service';

describe('ContratplayerService', () => {
  let service: ContratplayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratplayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
