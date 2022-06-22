import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const selectedMixin = css`
	background-color: #ece;
`;

const mineMixin = css`
	background-color: #000;
`;

const StyledCell = styled.button`
	width: 40px;
	height: 40px;
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

GridCell.propTypes = {
	cell: PropTypes.object,
	handleCellSelected: PropTypes.func,
};

export default GridCell;
