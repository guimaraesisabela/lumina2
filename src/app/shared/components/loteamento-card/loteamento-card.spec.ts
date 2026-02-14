import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteamentoCard } from './loteamento-card';

describe('LoteamentoCard', () => {
  let component: LoteamentoCard;
  let fixture: ComponentFixture<LoteamentoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoteamentoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoteamentoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
