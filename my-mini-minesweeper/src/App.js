import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledApp = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

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

const Level = {
	BEGINNER: {
		size: 9,
		mines: 10,
	},
	ADVANTAGE: {
		size: 16,
		mines: 40,
	},
};

const getKey = (cell) => `${cell.x},${cell.y}`;
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

function App() {
	const [levelType, setLevelType] = useState(null);
	const [mineList, setMineList] = useState();

	const handleLevelClicked = (type) => () => {
		setLevelType(type);
	};

	useEffect(() => {
		if (levelType !== null) {
			const getMines = async ({ size, mines }) => {
				await fetch(
					`https://tiki-minesweeper.herokuapp.com/getMines?size=${size}&mines=${mines}`
				)
					.then((response) => response.json())
					.then((response) => {
						console.log(response.data);
						setMineList(response.data);
					});
			};
			getMines(Level[levelType]);
		}
	}, [levelType]);

	return (
		<StyledApp>
			{!levelType && (
				<>
					<button onClick={handleLevelClicked('BEGINNER')}>Beginner</button>
					<button onClick={handleLevelClicked('ADVANTAGE')}>Advantage</button>
				</>
			)}
			{mineList && (
				<GridMines
					mines={mineList.map((item) => getKey(item))}
					size={Level[levelType]?.size}
				/>
			)}
		</StyledApp>
	);
}

export default App;
