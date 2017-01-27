/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DashboardWidgetDataService } from './dashboard-widget-data.service';

describe('DashboardWidgetDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardWidgetDataService]
    });
  });

  it('should ...', inject([DashboardWidgetDataService], (service: DashboardWidgetDataService) => {
    expect(service).toBeTruthy();
  }));
});
