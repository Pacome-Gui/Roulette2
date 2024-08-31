import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallNumberComponent } from './ball-number.component';

describe('BallNumberComponent', () => {
  let component: BallNumberComponent;
  let fixture: ComponentFixture<BallNumberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BallNumberComponent]
    });
    fixture = TestBed.createComponent(BallNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
