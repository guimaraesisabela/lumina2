import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandManagement } from './land-management';

describe('LandManagement', () => {
  let component: LandManagement;
  let fixture: ComponentFixture<LandManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
