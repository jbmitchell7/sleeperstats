import { Player } from "src/app/data/interfaces/roster";
import { DataInterface, initialDataInterfaceState } from "../selectors";
import { createReducer, on } from "@ngrx/store";
import { getPlayersFailure, getPlayersRequest, getPlayersSuccess } from "./players.actions";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

export interface PlayersState extends DataInterface, EntityState<Player> {}

export const playersAdapter: EntityAdapter<Player> = createEntityAdapter<Player>();

export const initialPlayersState: PlayersState = playersAdapter.getInitialState({
  ...initialDataInterfaceState
});

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
    const playersWithId = action.players.map((p: Player) => ({
      ...p,
      id: p.player_id
    }));
    const playersState = playersAdapter.upsertMany(playersWithId, state);
    return {
      ...playersState,
      isLoading: false,
      isLoaded: true,
      errorMessage: ''
    }
  })
)