import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsFinancial } from './reports-financial';

describe('ReportsFinancial', () => {
  let component: ReportsFinancial;
  let fixture: ComponentFixture<ReportsFinancial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsFinancial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsFinancial);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
