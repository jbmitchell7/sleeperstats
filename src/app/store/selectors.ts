import { StandingsData } from '../data/interfaces/standingsData';
import { Roster } from '../data/interfaces/roster';
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
  leagueData: LeagueState;
  rosterData: RosterState;
  managersData: ManagerState;
}

export const selectApp = (state: AppState) => state;

export const selectLeague = (state: AppState) => state.leagueData.league;

export const selectRosters = (state: AppState) => state.rosterData;

export const selectStandingsData = (state: AppState) => {
  const data: StandingsData[] = [];
  state.rosterData.rosters.forEach((roster: Roster) => {
    const manager = state.managersData.managers.find(
      (p) => p.user_id === roster.owner_id
    );
    if (!!manager) {
      const streak = roster.metadata?.streak;
      data.push({
        owner_id: roster.owner_id,
        playerIds: roster.players,
        username: manager.display_name,
        points: roster.settings.fpts,
        maxPoints: roster.settings.ppts,
        pointsAgainst: roster.settings.fpts_against,
        wins: roster.settings.wins,
        losses: roster.settings.losses,
        players: roster.playerData,
        streak: streak,
        avatarUrl: manager.avatarUrl ?? '',
        streakColor: streak ? getSeverity(streak) : undefined,
        streakIcon: streak ? getStreakIcon(streak) : undefined
      });
    }
  });
  return data;
};

const getSeverity = (streak: string): 'success' | 'info' | 'warning' | 'danger' => {
  const type = streak.slice(-1);
  const streakNumber = +streak.slice(0, -1);
  if (type.toLowerCase() === 'l') {
    return streakNumber > 2 ? 'info' : 'warning';
  }
  return streakNumber > 2 ? 'danger' : 'success';
};

const getStreakIcon = (streak: string): string => {
  const type = streak.slice(-1);
  const streakNumber = +streak.slice(0, -1);
  if (type.toLowerCase() === 'l') {
    return streakNumber > 2 ? 'fa-regular fa-snowflake' : 'fa-regular fa-face-frown';
  }
  return streakNumber > 2 ? 'fa-solid fa-fire' : 'fa-regular fa-face-smile';
};
