import { AppDispatch } from '../store';
import * as actionTypes from './actionTypes';

export const getMines = ({
  size,
  mines,
}: {
  size: Number;
  mines: number;
}): ThunkAction<any, any, any, any> => {
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
