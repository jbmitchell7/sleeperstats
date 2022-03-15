import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportStateComponent } from './sport-state.component';

describe('SportStateComponent', () => {
  let component: SportStateComponent;
  let fixture: ComponentFixture<SportStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
