import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropLoanComponent } from './crop-loan.component';

describe('CropLoanComponent', () => {
  let component: CropLoanComponent;
  let fixture: ComponentFixture<CropLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CropLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
