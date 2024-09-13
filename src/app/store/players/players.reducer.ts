import { Player } from "src/app/data/interfaces/roster";
import { DataInterface, initialDataInterfaceState } from "../selectors";
import { createReducer, on } from "@ngrx/store";
import { getPlayersSuccess } from "./players.actions";

export interface PlayersState extends DataInterface {
  players: {[key: string]: Player}
}

export const initialPlayersState: PlayersState = {
  ...initialDataInterfaceState,
  players: {}
}

export const playersReducer = createReducer(
  initialPlayersState,
  on(getPlayersSuccess, (state, action) => {
    let updatedPlayers: {[key: string]: Player} = state.players;
    action.players.forEach((p: Player, i) => updatedPlayers[p.player_id] = action.players[i]);
    return {
      ...state,
      players:updatedPlayers
    };
  })
)