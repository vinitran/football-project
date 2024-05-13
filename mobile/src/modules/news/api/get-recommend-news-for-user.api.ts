import { Observable, pluck, take } from 'rxjs';
import { ApiService } from '../../../services/api.services';

interface Params {
  limit: number;
  search?: string;
}

export const getRecommendNews = (api: ApiService, params: Params): Observable<string[]> => {
  if (!params.search) delete params.search;

  return api
    .get(`http://94.72.119.5:3030/api/v1/recommend/user/news`, params)
    .pipe(pluck('data'), take(1));
};
