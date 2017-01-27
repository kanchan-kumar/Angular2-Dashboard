/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProgressBarService } from './progress-bar.service';

describe('ProgressBarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgressBarService]
    });
  });

  it('should ...', inject([ProgressBarService], (service: ProgressBarService) => {
    expect(service).toBeTruthy();
  }));
});
