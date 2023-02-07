import { TestBed } from '@angular/core/testing';

import { DatasensService } from './datasens.service';

describe('BioproService', () => {
  let service: DatasensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatasensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
