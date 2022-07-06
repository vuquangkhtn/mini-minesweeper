import { render, screen, waitFor } from '../../testUtils';
import GameScreen from './index';

describe('GameScreen', () => {
  beforeEach(() => {
    window.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve({ data: [] }),
      });
  });

  it('should render', () => {
    render(<GameScreen />);
    expect(screen.getByText('00:00:00')).toBeInTheDocument();
  });

  it('should show timer when loaded mines', async () => {
    render(<GameScreen />, {
      preloadedState: {
        gameState: {
          selectedCells: [],
          level: 'BEGINNER',
        },
        mines: {
          loading: true,
        },
      },
    });
    expect(screen.getByText('Loading')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('00:00:00')));
  });

  it('should show lose popup when user lost', () => {
    render(<GameScreen />, {
      preloadedState: {
        gameState: {
          selectedCells: [],
          level: 'BEGINNER',
          status: 'LOSE',
        },
        mines: {
          list: [],
          loading: false,
        },
      },
    });
    expect(screen.getByText('you lost the game in 00:00:00')).toBeInTheDocument();
  });

  it('should show win popup when user won', () => {
    render(<GameScreen />, {
      preloadedState: {
        gameState: {
          selectedCells: [],
          level: 'BEGINNER',
          status: 'WIN',
        },
        mines: {
          list: [],
          loading: false,
        },
      },
    });
    expect(screen.getByText('you won the game in 00:00:00')).toBeInTheDocument();
  });
});
