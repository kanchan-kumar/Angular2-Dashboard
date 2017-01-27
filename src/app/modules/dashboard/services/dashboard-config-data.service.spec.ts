/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DashboardconfigdataService } from './dashboardconfigdata.service';

describe('DashboardconfigdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardconfigdataService]
    });
  });

  it('should ...', inject([DashboardconfigdataService], (service: DashboardconfigdataService) => {
    expect(service).toBeTruthy();
  }));
});
