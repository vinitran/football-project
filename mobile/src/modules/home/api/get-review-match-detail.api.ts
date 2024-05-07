import { Observable, pluck, take } from 'rxjs';
import { ApiService } from '../../../services/api.services';
import { Highlight } from '../../../interface/highlight.interface';

interface NewsDetailResponse {
  data: Highlight;
  data_related: Highlight[];
  data_hot: Highlight[];
}
export const getReviewMatchDetail = (
  api: ApiService,
  id: string
): Observable<NewsDetailResponse> => {
  return api.get(`https://api.vebo.xyz/api/news/vebotv/detail/${id}`).pipe(take(1));
};
