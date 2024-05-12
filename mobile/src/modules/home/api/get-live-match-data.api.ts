import { Observable, pluck, take } from 'rxjs';
import { ApiService } from '../../../services/api.services';
import { Match } from '../../../interface/match.interface';

export const getLiveData = (api: ApiService, id: string): Observable<Match> => {
  return api.get(`https://api.vebo.xyz/api/match/${id}`).pipe(pluck('data'), take(1));
};
