import { useDispatch } from 'react-redux';
import { selectLevel } from '../../states/gameState/actions';

const WelcomeScreen = () => {
	const dispatch = useDispatch();
	const handleLevelClicked = (type) => () => {
		dispatch(selectLevel(type));
	};
	return (
		<>
			<button onClick={handleLevelClicked('BEGINNER')}>Beginner</button>
			<button onClick={handleLevelClicked('ADVANTAGE')}>Advantage</button>
		</>
	);
};

export default WelcomeScreen;
