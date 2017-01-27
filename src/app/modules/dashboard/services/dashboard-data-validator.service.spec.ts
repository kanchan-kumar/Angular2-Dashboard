/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DashboardDataValidaterService } from './dashboard-data-validator.service';

describe('DashboardDataValidatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardDataValidaterService]
    });
  });

  it('should ...', inject([DashboardDataValidaterService], (service: DashboardDataValidaterService) => {
    expect(service).toBeTruthy();
  }));
});
