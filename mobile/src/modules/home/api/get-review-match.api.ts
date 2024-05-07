import { Observable, pluck, take, tap } from 'rxjs';
import { ApiService } from '../../../services/api.services';
import { Highlight } from '../../../interface/highlight.interface';

interface Response {
  highlight: Highlight;
  list: Highlight[];
}

export const getReviewMatch = (api: ApiService, pageNum: number): Observable<Response> => {
  return api
    .get(`https://api.vebo.xyz/api/news/vebotv/list/xemlai/${pageNum}`)
    .pipe(take(1), pluck('data'));
};
