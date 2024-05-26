import { Observable, pluck, take } from 'rxjs';
import { ApiService } from '../../../services/api.services';
import { News } from '../../../interface/news.interface';

export const getNewsListByIds = (api: ApiService, ids: string[]): Observable<News[]> => {
  return api
    .get(`http://94.72.119.5:3030/api/v1/news?news_ids=${ids.join(',')}`)
    .pipe(pluck('data'), take(1));
};
