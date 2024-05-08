import { Observable, pluck, take } from 'rxjs';
import { ApiService } from '../../../services/api.services';
import { Metadata } from '../../../interface/match.interface';

export const getLiveMetadata = (api: ApiService, id: string): Observable<Metadata> => {
  return api.get(`http://94.72.119.5:3030/api/v1/matchs/${id}/meta`).pipe(pluck('data'), take(1));
};
