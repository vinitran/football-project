import { Observable, pluck, take } from 'rxjs';
import { ApiService } from '../../../services/api.services';
import { News } from '../../../interface/news.interface';
import { Highlight } from '../../../interface/highlight.interface';

interface Response {
  highlight: Highlight;
  list: Highlight[];
}

export const getHighlightSearch = (api: ApiService, search?: string): Observable<Response> => {
  return api
    .get(`https://api.vebo.xyz/api/news/vebotv/search/highlight/${search}`)
    .pipe(pluck('data'), take(1));
};
