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

	const checkLost = useCallback(
		(id) => {
			if (mines.includes(id)) {
				dispatch(selectCells(mines));
				dispatch(setGameStatus(GameStatus.LOSE));
				return true;
			}

			return false;
		},
		[dispatch, mines]
	);

	const checkWon = useCallback(
		(id) => {
			if (Level[level].size ** 2 === mines.length + selectedCells.length + 1) {
				dispatch(selectCells([id]));
				dispatch(setGameStatus(GameStatus.WIN));
				return true;
			}

			return false;
		},
		[dispatch, level, mines.length, selectedCells.length]
	);

	const playingGame = useCallback(
		(cell) => {
			if (gameStatus !== GameStatus.PLAYING) {
				dispatch(setGameStatus(GameStatus.PLAYING));
			}
			if (!selectedCells.includes(cell.id)) {
				if (cell.mineCount === 0) {
					const exploredCells = exploreCell(grid, cell);
					dispatch(selectCells(exploredCells));
				} else {
					dispatch(selectCells([cell.id]));
				}
			}
		},
		[dispatch, gameStatus, grid, selectedCells]
	);

	const handleCellSelected = useCallback(
		(cell) => () => {
			const { id } = cell;
			if (gameStatus === GameStatus.LOSE || gameStatus === GameStatus.WIN) {
				return;
			}

			if (checkLost(id)) {
				return;
			}

			if (checkWon(id)) {
				return;
			}

			playingGame(cell);
		},
		[checkLost, checkWon, playingGame, gameStatus]
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
