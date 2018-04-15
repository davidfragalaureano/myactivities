import { TestBed, inject } from '@angular/core/testing';

import { FacebookApiService } from './facebook-api.service';

describe('FacebookApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacebookApiService]
    });
  });

  it('should be created', inject([FacebookApiService], (service: FacebookApiService) => {
    expect(service).toBeTruthy();
  }));
});
