/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WidgetDataService } from './widget-data.service';

describe('WidgetDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WidgetDataService]
    });
  });

  it('should ...', inject([WidgetDataService], (service: WidgetDataService) => {
    expect(service).toBeTruthy();
  }));
});
