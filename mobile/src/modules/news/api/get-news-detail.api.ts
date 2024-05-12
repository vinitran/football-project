import { Observable, pluck, take } from 'rxjs';
import { ApiService } from '../../../services/api.services';

export const getNewsDetail = (api: ApiService, id: string): Observable<any> => {
  return api.get(`https://api.vebo.xyz/api/news/vebotv/detail/${id}`).pipe(pluck('data'), take(1));
};
