/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TreeDataRequestHandlerService } from './tree-data-request-handler.service';

describe('TreeDataRequestHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeDataRequestHandlerService]
    });
  });

  it('should ...', inject([TreeDataRequestHandlerService], (service: TreeDataRequestHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
