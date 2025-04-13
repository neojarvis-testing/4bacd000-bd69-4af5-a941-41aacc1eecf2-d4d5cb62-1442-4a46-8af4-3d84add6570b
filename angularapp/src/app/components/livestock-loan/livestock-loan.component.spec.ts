import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivestockLoanComponent } from './livestock-loan.component';

describe('LivestockLoanComponent', () => {
  let component: LivestockLoanComponent;
  let fixture: ComponentFixture<LivestockLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivestockLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivestockLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
