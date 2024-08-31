import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouletteNumberComponent } from './roulette-number.component';

describe('RouletteNumberComponent', () => {
  let component: RouletteNumberComponent;
  let fixture: ComponentFixture<RouletteNumberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RouletteNumberComponent]
    });
    fixture = TestBed.createComponent(RouletteNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
