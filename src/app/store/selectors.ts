import { LeaguePageData } from '../interfaces/leaguePageData';
import { Roster } from '../interfaces/roster';
import { SharedState } from './global.reducers';
import { LeagueState } from './league/league.reducer';
import { ManagerState } from './managers/managers.reducers';
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
  managersData: ManagerState;
}

export const selectApp = (state: AppState) => state;

export const selectSharedData = (state: AppState) => state.sharedData;

export const selectLeague = (state: AppState) => state.leagueData.league;

export const selectRosters = (state: AppState) => state.rosterData;

export const selectLeaguePageData = (state: AppState) => {
  const data: LeaguePageData[] = [];
  state.rosterData.rosters.forEach((roster: Roster) => {
    const manager = state.managersData.managers.find(
      (p) => p.user_id === roster.owner_id
    );
    if (!!manager) {
      data.push({
        owner_id: roster.owner_id,
        playerIds: roster.players,
        username: manager.display_name,
        points: roster.settings.fpts,
        maxPoints: roster.settings.ppts,
        pointsAgainst: roster.settings.fpts_against,
        wins: roster.settings.wins,
        losses: roster.settings.losses,
        players: roster.playerData
      });
    }
  });
  return data;
};
