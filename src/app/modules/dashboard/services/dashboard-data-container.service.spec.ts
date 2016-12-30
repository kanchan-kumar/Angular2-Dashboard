/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DashboardDataContainerService } from './dashboard-data-container.service';

describe('DashboardDataContainerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardDataContainerService]
    });
  });

  it('should ...', inject([DashboardDataContainerService], (service: DashboardDataContainerService) => {
    expect(service).toBeTruthy();
  }));
});
