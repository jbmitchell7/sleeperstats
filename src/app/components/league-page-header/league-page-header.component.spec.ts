import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaguePageHeaderComponent } from './league-page-header.component';

describe('SidebarComponent', () => {
  let component: LeaguePageHeaderComponent;
  let fixture: ComponentFixture<LeaguePageHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaguePageHeaderComponent]
    });
    fixture = TestBed.createComponent(LeaguePageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
