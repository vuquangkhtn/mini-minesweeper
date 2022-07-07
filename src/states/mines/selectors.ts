import { createSelector } from '@reduxjs/toolkit';
import { AppState } from './../store';
import { getKey } from '../../utils';

export const mineCoordinateListSelector = (state: AppState) =>
	state.mines?.list;
export const mineLoadingSelector = (state: AppState) => state.mines?.loading;

export const mineKeysSelector = createSelector(
	[mineCoordinateListSelector],
	(mineCoordinates: Position[]) => {
		return mineCoordinates.map((position) => getKey(position));
	}
);
