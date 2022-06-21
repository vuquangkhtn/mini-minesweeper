import { useState, useEffect } from 'react';
import styled from 'styled-components';
import GameScreen from './screens/GameScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { getKey } from './utils';
import { Level } from './constants';

const StyledApp = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

function App() {
	const [levelType, setLevelType] = useState(null);
	const [mineList, setMineList] = useState();

	const handleLevelClicked = (type) => () => {
		setLevelType(type);
	};

	useEffect(() => {
		if (levelType !== null) {
			const getMines = async ({ size, mines }) => {
				await fetch(
					`https://tiki-minesweeper.herokuapp.com/getMines?size=${size}&mines=${mines}`
				)
					.then((response) => response.json())
					.then((response) => {
						console.log(response.data);
						setMineList(response.data);
					});
			};
			getMines(Level[levelType]);
		}
	}, [levelType]);

	return (
		<StyledApp>
			{!levelType && <WelcomeScreen handleLevelClicked={handleLevelClicked} />}
			{mineList && (
				<GameScreen
					mines={mineList.map((item) => getKey(item))}
					size={Level[levelType]?.size}
				/>
			)}
		</StyledApp>
	);
}

export default App;
