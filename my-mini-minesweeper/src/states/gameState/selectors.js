import { createSelector } from '@reduxjs/toolkit';
import { Level } from '../../constants';
import { getKey } from '../../utils';
import { mineKeysSelector } from '../mines/selectors';

export const levelSelector = (state) => state.gameState.level;
export const gameStatusSelector = (state) => state.gameState.status;

export const selectedCellsSelector = (state) => state.gameState.selectedCells;

const countMineAround = (mines, cell) => {
	const directions = [
		{ x: -1, y: -1 }, // top left
		{ x: 0, y: -1 }, // top
		{ x: 1, y: -1 }, // top right
		{ x: -1, y: 0 }, // left
		{ x: 1, y: 0 }, // right
		{ x: -1, y: 1 }, // bottom left
		{ x: 0, y: 1 }, // bottom
		{ x: 1, y: 1 }, // bottom right
	];

	let count = 0;
	directions.forEach((item) => {
		const key = getKey({ x: item.x + cell.x, y: item.y + cell.y });

		if (mines.includes(key)) {
			count++;
		}
	});

	return count;
};
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
				const isMine = selected && mines.includes(key);

				rowList.push({
					...curCell,
					id: key,
					isMine,
					selected,
					mineCount: !isMine ? countMineAround(mines, curCell) : 0,
				});
			}
			grid.push(rowList);
		}
		return grid;
	}
);
