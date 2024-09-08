import { TestBed } from '@angular/core/testing';

import { VideoinfoService } from './videoinfo.service';

describe('VideoinfoService', () => {
  let service: VideoinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
