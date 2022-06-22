import * as actionTypes from './actionTypes';

const initialState = {
	list: [],
	loading: false,
};

const mineReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_MINES: {
			return {
				...state,
				loading: true,
			};
		}

		case actionTypes.GET_MINES_SUCCEEDED: {
			const { mines } = action.payload;
			return {
				...state,
				list: mines,
				loading: false,
			};
		}

		case actionTypes.GET_MINES_FAILED: {
			return {
				...state,
				loading: false,
			};
		}
		default: {
			return state;
		}
	}
};

export default mineReducer;
