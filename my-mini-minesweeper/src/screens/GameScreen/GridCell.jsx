import styled, { css } from 'styled-components';

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

	${(props) => props.selected && selectedMixin};
	${(props) => props.isMine && mineMixin};
`;

const GridCell = ({ cell, handleCellSelected }) => {
	const { selected, isMine, mineCount } = cell;
	return (
		<StyledCell
			selected={selected}
			isMine={selected && isMine}
			onClick={handleCellSelected(cell)}
		>
			{selected && mineCount ? mineCount : null}
		</StyledCell>
	);
};

// const MemoCell = memo(GridCell);
export default GridCell;
