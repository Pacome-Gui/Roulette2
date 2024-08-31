import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouletteStatComponent } from './roulette-stat.component';

describe('RouletteStatComponent', () => {
  let component: RouletteStatComponent;
  let fixture: ComponentFixture<RouletteStatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RouletteStatComponent]
    });
    fixture = TestBed.createComponent(RouletteStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
