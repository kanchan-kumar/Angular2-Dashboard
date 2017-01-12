/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DashboardDataUtilsService } from './dashboard-data-utils.service';

describe('DashboardDataUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardDataUtilsService]
    });
  });

  it('should ...', inject([DashboardDataUtilsService], (service: DashboardDataUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
