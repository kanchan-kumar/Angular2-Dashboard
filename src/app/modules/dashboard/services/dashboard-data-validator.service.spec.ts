/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DashboardDataValidatorService } from './dashboard-data-validator.service';

describe('DashboardDataValidatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardDataValidatorService]
    });
  });

  it('should ...', inject([DashboardDataValidatorService], (service: DashboardDataValidatorService) => {
    expect(service).toBeTruthy();
  }));
});
