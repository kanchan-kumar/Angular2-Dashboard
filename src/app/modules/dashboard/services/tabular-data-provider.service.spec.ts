/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TabularDataProviderService } from './tabular-data-provider.service';

describe('TabularDataProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TabularDataProviderService]
    });
  });

  it('should ...', inject([TabularDataProviderService], (service: TabularDataProviderService) => {
    expect(service).toBeTruthy();
  }));
});
