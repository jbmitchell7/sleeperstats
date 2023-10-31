import { LeaguePageData } from '../interfaces/leaguePageData';
import { Roster } from '../interfaces/roster';
import { SharedState } from './global.reducers';
import { LeagueState } from './league/league.reducer';
import { PlayerState } from './players/players.reducers';
import { RosterState } from './rosters/rosters.reducers';

export interface DataInterface {
  isLoading: boolean;
  isLoaded: boolean;
  errorMessage: string;
}

export const initialDataInterfaceState: DataInterface = {
  isLoading: false,
  isLoaded: false,
  errorMessage: '',
};

export interface AppState {
  sharedData: SharedState;
  leagueData: LeagueState;
  rosterData: RosterState;
  playersData: PlayerState;
}

export const selectApp = (state: AppState) => state;

export const selectSharedData = (state: AppState) => state.sharedData;

export const selectLeague = (state: AppState) => state.leagueData.league;

export const selectRosters = (state: AppState) => state.rosterData.rosters;

export const selectLeaguePageData = (state: AppState) => {
  const data: LeaguePageData[] = [];
  state.rosterData.rosters.forEach((roster: Roster) => {
    const player = state.playersData.players.find(
      (p) => p.user_id === roster.owner_id
    );
    if (!!player) {
      data.push({
        username: player.display_name,
        points: roster.settings.fpts,
        maxPoints: roster.settings.ppts,
        pointsAgainst: roster.settings.fpts_against,
        wins: roster.settings.wins,
        losses: roster.settings.losses,
      });
    }
  });
  return data;
};
