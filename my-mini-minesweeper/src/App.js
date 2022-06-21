import styled from 'styled-components';
import { Provider } from 'react-redux';
import store from './states/store';

import RootScreen from './screens/RootScreen';

const StyledApp = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

function App() {
	return (
		<Provider store={store}>
			<StyledApp>
				<RootScreen />
			</StyledApp>
		</Provider>
	);
}

export default App;
