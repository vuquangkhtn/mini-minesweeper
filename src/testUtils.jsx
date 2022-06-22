import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// Import your own reducer

import mines from './states/mines/reducer';
import gameState from './states/gameState/reducer';

function render(
	ui,
	{
		preloadedState,
		store = configureStore({
			reducer: {
				mines,
				gameState,
			},
			preloadedState,
		}),
		...renderOptions
	} = {}
) {
	function Wrapper({ children }) {
		return <Provider store={store}>{children}</Provider>;
	}
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
