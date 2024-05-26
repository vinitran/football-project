import { Observable, pluck, take } from 'rxjs';
import { ApiService } from '../../../services/api.services';

interface Payload {
  FeedbackType: string;
  ItemId: string;
}

export const postNewFeedBackUser = (api: ApiService, payload: Payload): Observable<any> => {
  return api
    .post(`http://94.72.119.5:3030/api/v1/recommend/feedback`, payload)
    .pipe(pluck('data'), take(1));
};
