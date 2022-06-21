import * as actionTypes from './actionTypes';

export const selectLevel = (level) => ({
	type: actionTypes.SELECT_LEVEL,
	payload: {
		level,
	},
});

export const setGameStatus = (status) => ({
	type: actionTypes.SET_GAME_STATUS,
	payload: {
		status,
	},
});

export const selectCells = (cells) => ({
	type: actionTypes.SELECT_CELLS,
	payload: {
		cells,
	},
});

export const clearSelectedCells = () => ({
	type: actionTypes.CLEAL_SELECTED_CELLS,
});

export const resetGame = () => (dispatch) => {
	dispatch(setGameStatus(null));
	dispatch(clearSelectedCells());
};
