import { createSelector } from '@reduxjs/toolkit';
import { Level } from '../../constants';
import { countMineAround, getKey } from '../../utils';
import { mineKeysSelector } from '../mines/selectors';

export const levelSelector = (state) => state.gameState.level;
export const gameStatusSelector = (state) => state.gameState.status;

export const selectedCellsSelector = (state) => state.gameState.selectedCells;

export const gridSelector = createSelector(
	[selectedCellsSelector, mineKeysSelector, levelSelector],
	(selectedCells, mines, level) => {
		const size = Level[level]?.size;
		const grid = [];
		for (let row = 0; row < size; row++) {
			const rowList = [];
			for (let col = 0; col < size; col++) {
				const curCell = { x: col, y: row };
				const key = getKey(curCell);
				const selected = selectedCells.includes(key);
				const isMine = mines.includes(key);

				rowList.push({
					...curCell,
					id: key,
					isMine,
					selected,
					mineCount: countMineAround(mines, curCell),
				});
			}
			grid.push(rowList);
		}
		return grid;
	}
);
