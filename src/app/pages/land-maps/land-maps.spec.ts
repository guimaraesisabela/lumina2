import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandMaps } from './land-maps';

describe('LandMaps', () => {
  let component: LandMaps;
  let fixture: ComponentFixture<LandMaps>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandMaps]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandMaps);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
