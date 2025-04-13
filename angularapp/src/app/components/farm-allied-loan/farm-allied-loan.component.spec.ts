import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmAlliedLoanComponent } from './farm-allied-loan.component';

describe('FarmAlliedLoanComponent', () => {
  let component: FarmAlliedLoanComponent;
  let fixture: ComponentFixture<FarmAlliedLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmAlliedLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmAlliedLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
