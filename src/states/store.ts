import { configureStore } from '@reduxjs/toolkit';

import mines from './mines/reducer';
import gameState from './gameState/reducer';

const store = configureStore({
  reducer: {
    mines,
    gameState,
  },
  preloadedState: {},
  devTools: process.env.NODE_ENV !== 'production', // eslint-disable-line
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
