import { Observable, pluck, take } from 'rxjs';
import { ApiService } from '../../../services/api.services';
import { News } from '../../../interface/news.interface';

interface Response {
  highlight: News;
  list: News[];
}

export const getNewsSearch = (api: ApiService, search?: string): Observable<Response> => {
  return api
    .get(`https://api.vebo.xyz/api/news/vebotv/search/news/${search}`)
    .pipe(pluck('data'), take(1));
};
