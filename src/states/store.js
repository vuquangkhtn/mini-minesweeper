import { configureStore } from '@reduxjs/toolkit';

import mines from './mines/reducer';
import gameState from './gameState/reducer';

export default configureStore({
	reducer: {
		mines,
		gameState,
	},
	preloadedState: {},
	devTools: process.env.NODE_ENV !== 'production', // eslint-disable-line
});
