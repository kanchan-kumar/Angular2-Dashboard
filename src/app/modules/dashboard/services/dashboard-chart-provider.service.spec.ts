/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DashboardChartProviderService } from './dashboard-chart-provider.service';

describe('DashboardChartProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardChartProviderService]
    });
  });

  it('should ...', inject([DashboardChartProviderService], (service: DashboardChartProviderService) => {
    expect(service).toBeTruthy();
  }));
});
