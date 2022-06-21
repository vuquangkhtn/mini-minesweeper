import PropTypes from 'prop-types';

const WelcomeScreen = ({ handleLevelClicked }) => {
	return (
		<>
			<button onClick={handleLevelClicked('BEGINNER')}>Beginner</button>
			<button onClick={handleLevelClicked('ADVANTAGE')}>Advantage</button>
		</>
	);
};

WelcomeScreen.propTypes = {
	handleLevelClicked: PropTypes.func,
};

export default WelcomeScreen;
