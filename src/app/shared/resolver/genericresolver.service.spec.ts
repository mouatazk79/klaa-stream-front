import { TestBed } from '@angular/core/testing';

import { GenericresolverService } from './genericresolver.service';

describe('GenericresolverService', () => {
  let service: GenericresolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericresolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
