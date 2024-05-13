import { Observable, pluck, take } from 'rxjs';
import { ApiService } from '../../../services/api.services';

export const getNewsDetail = (api: ApiService, id: string): Observable<any> => {
  return api.get(`http://94.72.119.5:3030/api/v1/news/${id}`).pipe(pluck('data'), take(1));
};
