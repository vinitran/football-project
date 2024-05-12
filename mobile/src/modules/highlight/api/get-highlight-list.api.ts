import { Observable, pluck, take } from 'rxjs';
import { ApiService } from '../../../services/api.services';
import { Highlight } from '../../../interface/highlight.interface';

interface Response {
  highlight: Highlight;
  list: Highlight[];
}

export const getHighlightList = (api: ApiService, pageNum: number): Observable<Response> => {
  return api
    .get(`https://api.vebo.xyz/api/news/vebotv/list/highlight/${pageNum}`)
    .pipe(pluck('data'), take(1));
};
