import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmEquipmentLoanComponent } from './farm-equipment-loan.component';

describe('FarmEquipmentLoanComponent', () => {
  let component: FarmEquipmentLoanComponent;
  let fixture: ComponentFixture<FarmEquipmentLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmEquipmentLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmEquipmentLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
