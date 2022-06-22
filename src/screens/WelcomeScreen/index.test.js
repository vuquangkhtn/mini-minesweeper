import { render, screen } from '../../testUtils';
import WelcomeScreen from './index';

describe('WelcomeScreen', () => {
	it('should render', () => {
		render(<WelcomeScreen />);
		const beginnerButton = screen.getByText('Beginner');
		const advantageButton = screen.getByText('Advantage');
		expect(beginnerButton).toBeInTheDocument();
		expect(advantageButton).toBeInTheDocument();
	});
});
