import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from '../../testUtils';
import RootScreen from './index';

describe('RootScreen', () => {
	beforeEach(() => {
		window.fetch = () =>
			Promise.resolve({
				json: () => Promise.resolve({ data: [] }),
			});
	});

	it('should show WelcomeScreen in intial loading page', () => {
		render(<RootScreen />);
		const beginnerButton = screen.getByText('Beginner');
		const advantageButton = screen.getByText('Advantage');
		expect(beginnerButton).toBeInTheDocument();
		expect(advantageButton).toBeInTheDocument();
	});

	it('should show GameScreen when selecting Beginner level', async () => {
		render(<RootScreen />);
		const beginnerButton = screen.getByText('Beginner');
		userEvent.click(beginnerButton);
		await waitFor(() => expect(screen.getByText('00:00:00')));
	});

	it('should show GameScreen when selecting Advantage level', async () => {
		render(<RootScreen />);
		const beginnerButton = screen.getByText('Advantage');
		userEvent.click(beginnerButton);
		await waitFor(() => expect(screen.getByText('00:00:00')));
	});
});
