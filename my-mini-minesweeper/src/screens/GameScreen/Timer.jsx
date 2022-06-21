import { useEffect, useRef, useState } from 'react';
import { GameStatus } from '../../constants';
import { useSelector } from 'react-redux';
import { gameStatusSelector } from '../../states/gameState/selectors';

const getTimeFormat = (number) => {
	return number >= 10 ? number : `0${number}`;
};

const getTimeString = (second) => {
	let curSecond = second;
	const hours = Math.floor(curSecond / 3600);
	curSecond = curSecond % 3600;
	const mins = Math.floor(curSecond / 60);
	curSecond = curSecond % 60;

	return `${getTimeFormat(hours)}:${getTimeFormat(mins)}:${getTimeFormat(
		curSecond
	)}`;
};

const Timer = ({ setTime }) => {
	const [second, setSecond] = useState(0);
	const intervalRef = useRef();
	const gameStatus = useSelector(gameStatusSelector);

	const timeString = getTimeString(second);

	useEffect(() => {
		if (gameStatus !== GameStatus.PLAYING) {
			intervalRef.current && clearInterval(intervalRef.current);
			setTime(timeString);
			return;
		}

		intervalRef.current = setInterval(() => {
			setSecond((second) => second + 1);
		}, 1000);

		return () => {
			clearInterval(intervalRef.current);
		};
		// eslint-disable-next-line
	}, [gameStatus]);

	return <div>{timeString}</div>;
};

export default Timer;
