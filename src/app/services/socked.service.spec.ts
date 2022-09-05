import { TestBed } from '@angular/core/testing';

import { SockedService } from './socked.service';

describe('SockedService', () => {
  let service: SockedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SockedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
