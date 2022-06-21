import { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { mineKeysSelector } from '../../states/mines/selectors';
import {
	gameStatusSelector,
	gridSelector,
	selectedCellsSelector,
} from '../../states/gameState/selectors';
import { GameStatus } from '../../constants';
import { setGameStatus, selectCells } from '../../states/gameState/actions';

const StyledGrid = styled.div`
	display: flex;
	flex-direction: column;
`;

const StyledRow = styled.div`
	display: flex;
`;

const selectedMixin = css`
	background-color: #ece;
`;

const mineMixin = css`
	background-color: #000;
`;

const StyledCell = styled.button`
	width: 20px;
	height: 20px;
	border: 1px solid black;

	&:hover {
		background-color: #ccc;
	}

	${(props) => props.selected && selectedMixin};
	${(props) => props.isMine && mineMixin};
`;

const GridCell = ({ id, selected, isMine, mineCount, handleCellSelected }) => {
	return (
		<StyledCell
			selected={selected}
			isMine={isMine}
			onClick={handleCellSelected(id)}
		>
			{selected && mineCount ? mineCount : null}
		</StyledCell>
	);
};

// const MemoCell = memo(GridCell);

const GridMines = () => {
	const grid = useSelector(gridSelector);

	const mines = useSelector(mineKeysSelector);
	const gameStatus = useSelector(gameStatusSelector);
	const selectedCells = useSelector(selectedCellsSelector);
	const dispatch = useDispatch();

	const handleCellSelected = useCallback(
		(currentCellKey) => () => {
			if (gameStatus === GameStatus.LOSE || gameStatus === GameStatus.WIN) {
				return;
			}

			// LOSE
			if (mines.includes(currentCellKey)) {
				dispatch(selectCells(mines));
				dispatch(setGameStatus(GameStatus.LOSE));
				return;
			}

			if (gameStatus !== GameStatus.PLAYING) {
				dispatch(setGameStatus(GameStatus.PLAYING));
			}

			if (!selectedCells.includes(currentCellKey)) {
				dispatch(selectCells([currentCellKey]));
			}
		},
		[dispatch, mines, selectedCells, gameStatus]
	);

	return (
		<StyledGrid>
			{grid.map((row, index) => (
				<StyledRow key={index}>
					{row.map((cell) => (
						<GridCell
							key={cell.id}
							id={cell.id}
							selected={cell.selected}
							isMine={cell.isMine}
							mineCount={cell.mineCount}
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
