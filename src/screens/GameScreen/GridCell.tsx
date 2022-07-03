import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { ButtonHTMLAttributes, MouseEventHandler } from 'react';

const selectedMixin = css`
	background-color: #ece;
`;

const mineMixin = css`
	background-color: #000;
`;

interface StyledCell {
	selected: boolean;
	isMine: boolean;
}

const StyledCell = styled.button<StyledCell>`
	width: 40px;
	height: 40px;
	border: 1px solid black;

	${(props) => props.selected && selectedMixin};
	${(props) => props.isMine && mineMixin};
`;

interface GridCellProps {
	cell: Cell;
	handleCellSelected: (cell: Cell) => MouseEventHandler<HTMLButtonElement>;
}

const GridCell = ({ cell, handleCellSelected }: GridCellProps) => {
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

GridCell.propTypes = {
	cell: PropTypes.object,
	handleCellSelected: PropTypes.func,
};

export default GridCell;
