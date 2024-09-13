import { Player } from "src/app/data/interfaces/roster";
import { DataInterface, initialDataInterfaceState } from "../selectors";
import { createReducer, on } from "@ngrx/store";
import { getPlayersFailure, getPlayersRequest, getPlayersSuccess } from "./players.actions";

export interface PlayersState extends DataInterface {
  players: Player[]
}

export const initialPlayersState: PlayersState = {
  ...initialDataInterfaceState,
  players: []
};

export const playersReducer = createReducer(
  initialPlayersState,
  on(getPlayersRequest, (state) => ({
    ...state,
    isLoading: true,
    isLoaded: false
  })),
  on(getPlayersFailure, (state, action) => ({
    ...state,
    isLoading: false,
    isLoaded: true,
    errorMessage: action.error,
  })),
  on(getPlayersSuccess, (state, action) => {
    const updatedPlayers = state.players.concat(action.players);
    return {
      players: updatedPlayers,
      isLoading: false,
      isLoaded: true,
      errorMessage: ''
    }
  })
)