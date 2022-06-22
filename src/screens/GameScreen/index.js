import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { mineLoadingSelector } from '../../states/mines/selectors';
import {
	gameStatusSelector,
	levelSelector,
} from '../../states/gameState/selectors';
import { getMines } from '../../states/mines/actions';
import { Level, GameStatus } from '../../constants';

import GridMines from './GridMines';
import GamePopup from './GamePopup';
import Timer from './Timer';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const GameScreen = () => {
	const [time, setTime] = useState('');
	const mineLoading = useSelector(mineLoadingSelector);
	const levelType = useSelector(levelSelector);
	const gameStatus = useSelector(gameStatusSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		if (levelType !== null && !gameStatus) {
			dispatch(getMines(Level[levelType]));
		}
	}, [levelType, gameStatus, dispatch]);

	if (mineLoading) return <div>Loading</div>;

	return (
		<Wrapper>
			<Timer setTime={setTime} />
			<GridMines />
			{gameStatus === GameStatus.LOSE && (
				<GamePopup title={'you lost the game in ' + time} />
			)}
			{gameStatus === GameStatus.WIN && (
				<GamePopup title={'you won the game in ' + time} />
			)}
		</Wrapper>
	);
};

export default GameScreen;
