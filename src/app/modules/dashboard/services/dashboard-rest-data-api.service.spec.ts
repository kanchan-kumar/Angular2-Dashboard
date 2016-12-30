/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DashboardRESTDataAPIService } from './dashboard-rest-data-api.service';

describe('DashboardRESTDataAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardRESTDataAPIService]
    });
  });

  it('should ...', inject([DashboardRESTDataAPIService], (service: DashboardRESTDataAPIService) => {
    expect(service).toBeTruthy();
  }));
});
