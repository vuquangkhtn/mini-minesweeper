import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { gameStatusSelector } from '../../states/gameState/selectors';
import { GameStatus } from '../../constants';

const getTimeFormat = (number: number) => {
	return number >= 10 ? number : `0${number}`;
};

const getTimeString = (second: number) => {
	let curSecond = second;
	const hours = Math.floor(curSecond / 3600);
	curSecond = curSecond % 3600;
	const mins = Math.floor(curSecond / 60);
	curSecond = curSecond % 60;

	return `${getTimeFormat(hours)}:${getTimeFormat(mins)}:${getTimeFormat(
		curSecond
	)}`;
};

interface TimerProps {
	setTime: (time: string) => void;
}

const Timer = ({ setTime }: TimerProps) => {
	const [second, setSecond] = useState(0);
	const intervalRef = useRef<ReturnType<typeof setInterval>>();
	const gameStatus = useSelector(gameStatusSelector);

	const timeString = getTimeString(second);

	useEffect(() => {
		if (gameStatus && gameStatus !== GameStatus.PLAYING) {
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

Timer.propTypes = {
	setTime: PropTypes.func,
};

export default Timer;
