import { TestBed } from '@angular/core/testing';

import { ChromeScriptService } from './chrome-script.service';

describe('ChromeScriptService', () => {
  let service: ChromeScriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChromeScriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
