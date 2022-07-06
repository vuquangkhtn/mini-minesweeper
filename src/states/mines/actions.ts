import { AppDispatch } from '../store';
import * as actionTypes from './actionTypes';

type GetMineRequest = {
  size: Number;
  mines: number;
};

export const getMines = ({ size, mines }: GetMineRequest): any => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: actionTypes.GET_MINES,
    });

    try {
      const response = await fetch(
        `https://tiki-minesweeper.herokuapp.com/getMines?size=${size}&mines=${mines}`,
      );
      const jsonResponse = await response.json();
      const data = jsonResponse?.data;
      dispatch({
        type: actionTypes.GET_MINES_SUCCEEDED,
        payload: {
          mines: data,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
};
