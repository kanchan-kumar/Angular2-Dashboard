/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DashboardLowerTabularPanelComponent } from './dashboard-lower-tabular-panel.component';

describe('DashboardLowerTabularPanelComponent', () => {
  let component: DashboardLowerTabularPanelComponent;
  let fixture: ComponentFixture<DashboardLowerTabularPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardLowerTabularPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLowerTabularPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
