import { Observable, pluck, take } from 'rxjs';
import { ApiService } from '../../../services/api.services';

interface Response {
  id: string;
  email: string;
  username: string;
  name: string;
}

export const showme = (api: ApiService): Observable<Response> => {
  return api.get(`https://api.bongdaviet247.com/api/v1/me`).pipe(take(1), pluck('data'));
};
