import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAppliedLoanDetailsComponent } from './view-applied-loan-details.component';

describe('ViewAppliedLoanDetailsComponent', () => {
  let component: ViewAppliedLoanDetailsComponent;
  let fixture: ComponentFixture<ViewAppliedLoanDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAppliedLoanDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAppliedLoanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
