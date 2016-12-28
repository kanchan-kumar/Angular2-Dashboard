/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DashboardMenuNavigatorService } from './dashboard-menu-navigator.service';

describe('DashboardMenuNavigatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardMenuNavigatorService]
    });
  });

  it('should ...', inject([DashboardMenuNavigatorService], (service: DashboardMenuNavigatorService) => {
    expect(service).toBeTruthy();
  }));
});
