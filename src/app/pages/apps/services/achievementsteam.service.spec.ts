import { TestBed } from '@angular/core/testing';

import { AchievementsteamService } from './achievementsteam.service';

describe('AchievementsteamService', () => {
  let service: AchievementsteamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AchievementsteamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
