import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanStatusChartComponent } from './loan-status-chart.component';

describe('LoanStatusChartComponent', () => {
  let component: LoanStatusChartComponent;
  let fixture: ComponentFixture<LoanStatusChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanStatusChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanStatusChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
