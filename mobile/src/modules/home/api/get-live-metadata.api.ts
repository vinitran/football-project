import { Observable, pluck, take } from 'rxjs';
import { ApiService } from '../../../services/api.services';
import { Metadata } from '../../../interface/match.interface';

export const getLiveMetadata = (api: ApiService, id: string): Observable<Metadata> => {
  return api.get(`https://api.bongdaviet247.com/api/v1/matchs/${id}/meta`).pipe(pluck('data'), take(1));
};
