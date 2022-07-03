import { ThunkDispatch, Action } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from './../store';
import * as actionTypes from './actionTypes';

export const selectLevel = (level: LevelType) => ({
  type: actionTypes.SELECT_LEVEL,
  payload: {
    level,
  },
});

export const setGameStatus = (status: GameStatusType) => ({
  type: actionTypes.SET_GAME_STATUS,
  payload: {
    status,
  },
});

export const selectCells = (cells: Key[]) => ({
  type: actionTypes.SELECT_CELLS,
  payload: {
    cells,
  },
});

export const clearSelectedCells = () => ({
  type: actionTypes.CLEAL_SELECTED_CELLS,
});

// TODO: update explicit type
export const resetGame = (): any => (dispatch: any) => {
  dispatch(setGameStatus(null));
  dispatch(clearSelectedCells());
};
