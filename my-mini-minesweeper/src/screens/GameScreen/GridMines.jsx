import { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { getKey } from '../../utils';

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

const GridMines = ({ mines, size }) => {
	const [selectedCells, setSelectedCells] = useState([]);

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
				key,
				isMine,
				selected,
				mineCount: !isMine ? countMineAround(mines, curCell) : 0,
			});
		}
		grid.push(rowList);
	}

	const handleCellSelected = (cell) => () => {
		const currentCellKey = getKey(cell);

		if (!selectedCells.includes(currentCellKey)) {
			setSelectedCells((cells) => [...cells, currentCellKey]);
		}
	};

	return (
		<StyledGrid>
			{grid.map((row, index) => (
				<StyledRow key={index}>
					{row.map((cell) => (
						<StyledCell
							key={cell.key}
							selected={cell.selected}
							isMine={cell.isMine}
							onClick={handleCellSelected(cell)}
						>
							{cell.selected && cell.mineCount ? cell.mineCount : null}
						</StyledCell>
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
