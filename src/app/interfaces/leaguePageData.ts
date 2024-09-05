import { Player } from "./roster";

export interface LeaguePageData {
  username: string;
  points: number;
  maxPoints: number;
  pointsAgainst: number;
  wins: number;
  losses: number;
  owner_id: string;
  playerIds: string[];
  players?: Player[];
  streak: string;
  avatarUrl: string;
}
