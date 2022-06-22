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

export const getKey = (cell) => `${cell.x},${cell.y}`;

export const countMineAround = (mines, cell) => {
	let count = 0;
	directions.forEach((item) => {
		const key = getKey({ x: item.x + cell.x, y: item.y + cell.y });

		if (mines.includes(key)) {
			count++;
		}
	});

	return count;
};

const getValidCellAround = (grid, cell) => {
	let cells = [];
	directions.forEach((item) => {
		const positionX = item.x + cell.x;
		const positionY = item.y + cell.y;

		const currentCell =
			grid[positionY] && grid[positionY][positionX]
				? grid[positionY][positionX]
				: null;
		if (currentCell && !currentCell.isMine) {
			cells.push(currentCell);
		}
	});
	return cells;
};

export const exploreCell = (grid, cell) => {
	const result = [];

	const exploreUtils = (queue, visited) => {
		while (queue.length > 0) {
			const currentCell = queue.shift();
			if (visited[currentCell.id]) {
				continue;
			}
			visited[currentCell.id] = true;
			result.push(currentCell.id);
			if (currentCell.mineCount !== 0) {
				continue;
			}

			const aroundCells = getValidCellAround(grid, currentCell);
			for (let item of aroundCells) {
				if (!visited[item.id]) {
					queue.push(item);
				}
			}
		}
	};
	exploreUtils([cell], {});
	return result;
};

export const unique = (arr) => arr.filter((v, i, a) => a.indexOf(v) === i);
