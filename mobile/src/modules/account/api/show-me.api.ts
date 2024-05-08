import { Observable, pluck, take } from 'rxjs';
import { ApiService } from '../../../services/api.services';

interface Response {
  id: string;
  email: string;
  username: string;
  name: string;
}

interface LoginPayload {
  username: string;
  password: string;
}

export const showme = (api: ApiService, payload: LoginPayload): Observable<Response> => {
  return api.post(`http://94.72.119.5:3030/api/v1/me`, payload).pipe(take(1), pluck('data'));
};
