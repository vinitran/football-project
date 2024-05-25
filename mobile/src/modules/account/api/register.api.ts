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
  name: string;
  email: string;
}

export const register = (api: ApiService, payload: LoginPayload): Observable<Response> => {
  return api.post(`https://api.bongdaviet247.com/api/v1/auth/register`, payload).pipe(take(1));
};
