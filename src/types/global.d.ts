import { GameStatus, Level } from '../constants';
declare global {
  interface Position {
    x: string;
    y: string;
  }

  interface Cell {
    id: Key;
    mineCount: number;
    isMine: boolean;
    selected: boolean;
  }

  interface GameState {
    level: LevelType;
    status: GameStatusType;
    selectedCells: Key[];
  }

  interface MinesState {
    list: Position[];
    loading: boolean;
  }

  type LevelType = keyof typeof Level | null;
  type GameStatusType = keyof typeof GameStatus | null;
  type Key = string;

  type ThunkAction<
    R, // Return type of the thunk function
    S, // state type used by getState
    E, // any "extra argument" injected into the thunk
    A extends Action // known types of actions that can be dispatched
  > = (
    dispatch: ThunkDispatch<S, E, A>,
    getState: () => S,
    extraArgument: E
  ) => R;
}

export {};
