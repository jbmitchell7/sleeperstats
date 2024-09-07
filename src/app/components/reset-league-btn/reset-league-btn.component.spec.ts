import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetLeagueBtnComponent } from './reset-league-btn.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('ResetLeagueBtnComponent', () => {
  let component: ResetLeagueBtnComponent;
  let fixture: ComponentFixture<ResetLeagueBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetLeagueBtnComponent],
      providers: [provideMockStore()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetLeagueBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
