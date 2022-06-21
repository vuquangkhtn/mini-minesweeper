import * as actionTypes from './actionTypes';

const initialState = {
	level: null,
	status: '',
	selectedCells: [],
};

const gameStateReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SELECT_LEVEL: {
			const { level } = action.payload;
			return {
				...state,
				level,
			};
		}

		case actionTypes.SET_GAME_STATUS: {
			const { status } = action.payload;
			return {
				...state,
				status,
			};
		}

		case actionTypes.SELECT_CELLS: {
			const { cells } = action.payload;
			return {
				...state,
				selectedCells: [...state.selectedCells, ...cells],
			};
		}

		case actionTypes.CLEAL_SELECTED_CELLS: {
			return {
				...state,
				selectedCells: [],
			};
		}

		default: {
			return state;
		}
	}
};

export default gameStateReducer;
