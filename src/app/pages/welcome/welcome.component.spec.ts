import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FetchApiDataService } from 'src/app/api/fetch-api-data.service';
import { of } from 'rxjs';
import { League } from 'src/app/interfaces/league';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let service: FetchApiDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      imports: [HttpClientTestingModule],
      providers: [provideMockStore()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    let store = {} as any;
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };  spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    service = TestBed.inject(FetchApiDataService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('setLeagueId', () => {
    const mockLeague: League = {
      status: 'in_season',
      previous_league_id: '012',
      league_id: '123',
      name: 'Test League',
      season: '2024'
    }
    spyOn(service, 'sleeperGet').and.returnValue(of(mockLeague));
    component.leagueIdInput = '123';
    component.setLeagueId();
    expect(localStorage.getItem('LEAGUE_ID')).toEqual(mockLeague.league_id);
  });
});
