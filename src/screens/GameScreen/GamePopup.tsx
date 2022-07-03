import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { resetGame, selectLevel } from '../../states/gameState/actions';

const Wrapper = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	background-color: white;
	border: 1px solid black;
	border-radius: 5px;
	min-width: 300px;
	height: 150px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
`;

interface GamePopupProps {
	title: string;
}

const GamePopup = ({ title }: GamePopupProps) => {
	const dispatch = useDispatch();

	const backToHomepage = () => {
		dispatch(selectLevel(null));
		dispatch(resetGame());
	};

	const createNewGame = () => {
		dispatch(resetGame());
	};

	return (
		<Wrapper>
			<h1>{title}</h1>
			<div>
				<button onClick={createNewGame}>New Game</button>
				<button onClick={backToHomepage}>Return Home</button>
			</div>
		</Wrapper>
	);
};

export default GamePopup;
