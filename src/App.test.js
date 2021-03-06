import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
	it('should render', () => {
		render(<App />);
		const beginnerButton = screen.getByText('Beginner');
		const advantageButton = screen.getByText('Advantage');
		expect(beginnerButton).toBeInTheDocument();
		expect(advantageButton).toBeInTheDocument();
	});
});
