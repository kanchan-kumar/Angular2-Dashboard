/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DashboardDataRequestHandlerService } from './dashboard-data-request-handler.service';

describe('DashboardDataRequestHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardDataRequestHandlerService]
    });
  });

  it('should ...', inject([DashboardDataRequestHandlerService], (service: DashboardDataRequestHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
