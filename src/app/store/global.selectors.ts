import { StandingsData } from '../data/interfaces/standingsData';
import { LeagueState } from './league/league.reducer';
import { ManagerState } from './managers/managers.reducers';
import { RosterState } from './rosters/rosters.reducers';
import { TransactionsState } from './transactions/transactions.reducer';
import { PlayersState } from './players/players.reducer';
import { SFF_Transaction, TransactionType } from '../data/interfaces/Transactions';

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
  playerData: PlayersState;
  leagueData: LeagueState;
  rosterData: RosterState;
  managersData: ManagerState;
  transactionsData: TransactionsState;
}

export const selectApp = (state: AppState) => state;

export const selectLeague = (state: AppState) => state.leagueData.league;

export const selectRosters = (state: AppState) => state.rosterData;

export const selectTransactions = (state: AppState) => state.transactionsData.transactions;

export const selectAllPlayers = (state: AppState) => state.playerData;

export const selectStandingsData = (state: AppState) => {
  const data: StandingsData[] = [];
  Object.keys(state.rosterData.entities).forEach(key => {
    const manager = state.managersData.entities[key];
    const roster = state.rosterData.entities[key];
    if (!!manager && !!roster)  {
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

export const selectCurrentWeekTransactions = (state: AppState) => {
  const detailedTransactions: SFF_Transaction[] = [];
  const currentWeek = state.leagueData.league.sportState?.week;
  const weeklyTransactions = state.transactionsData.transactions[currentWeek];
  if (weeklyTransactions?.length) {
    weeklyTransactions.forEach(t => {
      if (t.type !== TransactionType.TRADE) {
        if (t.adds) {
          addToDetailTransactions(state, t.adds, 'ADD', detailedTransactions);
        }
        if (t.drops) {
          addToDetailTransactions(state, t.drops, 'DROP', detailedTransactions);
        }
      }
    });
  }
  return detailedTransactions;
};

const addToDetailTransactions = (
  state: AppState,
  transactionObj: {[key: string]: any},
  type: string,
  list: SFF_Transaction[]
) => {
  Object.entries(transactionObj).forEach((e: any) => {
    const managerId = getManager(state.rosterData, e[1]);
    const player = state.playerData.entities[e[0]];
    list.push({
      roster: managerId ? state.rosterData.entities[managerId] :  undefined,
      player: player ?? {player_id: e[0]},
      manager: managerId ? state.managersData.entities[managerId] : undefined,
      type
    })
  });
}

const getManager = (rosters: RosterState, rosterId: number): string | undefined => {
  return Object
    .keys(rosters.entities)
    .find(key => rosters.entities[key]?.roster_id === rosterId);
};
