import { Observable, pluck, take } from 'rxjs';
import { ApiService } from '../../../services/api.services';
import { Match } from '../../../interface/match.interface';

export const getScheduleMatch = (api: ApiService, date: string): Observable<Match[]> => {
  return api.get('https://api.vebo.xyz/api/match/fixture/' + date).pipe(pluck('data'), take(1));
};
