import { Observable, pluck, take } from 'rxjs';
import { ApiService } from '../../../services/api.services';

interface Response {
  id: string;
  email: string;
  username: string;
  name: string;
}

export const showme = (api: ApiService): Observable<Response> => {
  return api.get(`http://94.72.119.5:3030/api/v1/me`).pipe(take(1), pluck('data'));
};
