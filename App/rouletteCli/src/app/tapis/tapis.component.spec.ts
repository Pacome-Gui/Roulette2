import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TapisComponent } from './tapis.component';

describe('TapisComponent', () => {
  let component: TapisComponent;
  let fixture: ComponentFixture<TapisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TapisComponent]
    });
    fixture = TestBed.createComponent(TapisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
