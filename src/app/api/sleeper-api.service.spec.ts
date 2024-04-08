import { TestBed } from '@angular/core/testing';

import { SleeperApiService } from './sleeper-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SleeperApiService', () => {
  let service: SleeperApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SleeperApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
