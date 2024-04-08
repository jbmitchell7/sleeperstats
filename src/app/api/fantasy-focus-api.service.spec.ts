import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FantasyFocusApiService } from './fantasy-focus-api.service';

describe('FantasyFocusApiService', () => {
  let service: FantasyFocusApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FantasyFocusApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
