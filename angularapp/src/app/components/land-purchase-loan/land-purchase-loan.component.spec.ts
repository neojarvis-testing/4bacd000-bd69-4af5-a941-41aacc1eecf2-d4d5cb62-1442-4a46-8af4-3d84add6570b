import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandPurchaseLoanComponent } from './land-purchase-loan.component';

describe('LandPurchaseLoanComponent', () => {
  let component: LandPurchaseLoanComponent;
  let fixture: ComponentFixture<LandPurchaseLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandPurchaseLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandPurchaseLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
