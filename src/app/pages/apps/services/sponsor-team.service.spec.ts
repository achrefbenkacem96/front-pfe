import { TestBed } from '@angular/core/testing';

import { SponsorTeamService } from './sponsor-team.service';

describe('SponsorTeamService', () => {
  let service: SponsorTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SponsorTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
