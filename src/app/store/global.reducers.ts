import { createReducer, on } from '@ngrx/store';
import { toggleSidebarExpanded } from './global.actions';

export interface SharedState {
  sidebarExpanded: boolean;
}

export const initialSharedState: SharedState = {
  sidebarExpanded: false,
};

export const sharedDataReducer = createReducer(
  initialSharedState,
  on(toggleSidebarExpanded, (state) => ({
    sidebarExpanded: !state.sidebarExpanded,
  }))
);
