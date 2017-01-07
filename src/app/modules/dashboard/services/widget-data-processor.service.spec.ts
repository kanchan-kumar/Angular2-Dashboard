/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WidgetDataProcessorService } from './widget-data-processor.service';

describe('WidgetDataProcessorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WidgetDataProcessorService]
    });
  });

  it('should ...', inject([WidgetDataProcessorService], (service: WidgetDataProcessorService) => {
    expect(service).toBeTruthy();
  }));
});
