import { Observable, pluck, take } from 'rxjs';
import { ApiService } from '../../../services/api.services';
import { News } from '../../../interface/news.interface';

interface Response {
  highlight: News;
  list: News[];
}

export const getNewsList = (api: ApiService, pageNum: number): Observable<Response> => {
  return api
    .get(`https://api.vebo.xyz/api/news/vebotv/list/news/${pageNum}`)
    .pipe(pluck('data'), take(1));
};
