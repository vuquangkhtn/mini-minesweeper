import { createSelector } from '@reduxjs/toolkit';
import { getKey } from '../../utils';

export const mineCoordinateListSelector = (state) => state.mines?.list;
export const mineLoadingSelector = (state) => state.mines?.loading;

export const mineKeysSelector = createSelector(
	[mineCoordinateListSelector],
	(mineCoordinates) => {
		return mineCoordinates.map((position) => getKey(position));
	}
);
