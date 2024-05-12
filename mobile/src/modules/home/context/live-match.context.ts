import { createContext } from 'react';

export interface IMatchContext {
  matchId: string;
}

export const MatchContext = createContext<IMatchContext>({
  matchId: '',
});
