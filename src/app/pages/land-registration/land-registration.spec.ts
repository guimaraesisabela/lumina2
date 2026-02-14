import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandRegistration } from './land-registration';

describe('LandRegistration', () => {
  let component: LandRegistration;
  let fixture: ComponentFixture<LandRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandRegistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandRegistration);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
