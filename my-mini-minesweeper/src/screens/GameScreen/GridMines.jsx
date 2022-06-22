import { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { mineKeysSelector } from '../../states/mines/selectors';
import {
	gameStatusSelector,
	gridSelector,
	selectedCellsSelector,
} from '../../states/gameState/selectors';
import { GameStatus, Level } from '../../constants';
import { setGameStatus, selectCells } from '../../states/gameState/actions';
import { levelSelector } from '../../states/gameState/selectors';
import GridCell from './GridCell';
import { exploreCell } from '../../utils';

const StyledGrid = styled.div`
	display: flex;
	flex-direction: column;
`;

const StyledRow = styled.div`
	display: flex;
`;

const GridMines = () => {
	const grid = useSelector(gridSelector);

	const mines = useSelector(mineKeysSelector);
	const level = useSelector(levelSelector);
	const gameStatus = useSelector(gameStatusSelector);
	const selectedCells = useSelector(selectedCellsSelector);
	const dispatch = useDispatch();

	const handleCellSelected = useCallback(
		(cell) => () => {
			const { id, mineCount } = cell;
			if (gameStatus === GameStatus.LOSE || gameStatus === GameStatus.WIN) {
				return;
			}

			// LOSE
			if (mines.includes(id)) {
				dispatch(selectCells(mines));
				dispatch(setGameStatus(GameStatus.LOSE));
				return;
			}

			// WIN
			console.log(mines.length, selectedCells.length);
			if (Level[level].size ** 2 === mines.length + selectedCells.length + 1) {
				dispatch(selectCells([id]));
				dispatch(setGameStatus(GameStatus.WIN));
				return;
			}

			if (gameStatus !== GameStatus.PLAYING) {
				dispatch(setGameStatus(GameStatus.PLAYING));
			}

			if (!selectedCells.includes(id)) {
				if (mineCount === 0) {
					const exploredCells = exploreCell(grid, cell);
					dispatch(selectCells(exploredCells));
				} else {
					dispatch(selectCells([id]));
				}
			}
		},
		[dispatch, mines, selectedCells, gameStatus, level, grid]
	);

	return (
		<StyledGrid>
			{grid.map((row, index) => (
				<StyledRow key={index}>
					{row.map((cell) => (
						<GridCell
							key={cell.id}
							cell={cell}
							handleCellSelected={handleCellSelected}
						/>
					))}
				</StyledRow>
			))}
		</StyledGrid>
	);
};

GridMines.propTypes = {
	mines: PropTypes.arrayOf(String),
	size: PropTypes.number,
};

export default GridMines;
