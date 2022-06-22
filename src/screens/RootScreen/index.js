import { useSelector } from 'react-redux';
import GameScreen from '../GameScreen';
import WelcomeScreen from '../WelcomeScreen';

import { levelSelector } from '../../states/gameState/selectors';

const RootScreen = () => {
	const levelType = useSelector(levelSelector);
	return !levelType ? <WelcomeScreen /> : <GameScreen />;
};

export default RootScreen;
