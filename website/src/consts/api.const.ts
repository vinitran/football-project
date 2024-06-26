import { feedbackEnum } from './feedback-type.const';

// export const baseURL: string = 'https://api.vebo.xyz/api/';
export const baseURL: string = 'https://api.bongdaviet247.com/api/v1/';

export const apis: any = {
  news: {
    list: ({
      limit,
      page,
      search,
      news_ids
    }: {
      limit?: string;
      page?: number;
      search?: string;
      news_ids?: string;
    }) => {
      return (
        'news?' +
        (limit !== undefined ? `limit=${limit}` : ``) +
        (page !== undefined ? `&page=${page}` : ``) +
        (search !== undefined ? `&search=${search}` : ``) +
        (news_ids !== undefined ? `&news_ids=${news_ids}` : ``)
      );
    },
    count: ({ search }: { search?: string }) =>{
      return `news/count${search ? '&search=' + search : ''}`
    },
    detail: ({ id }: { id: string }) => `news/${id}`,
    relative: ({ id }: { id: string }) => `news/${id}/neighbors`,
    hot: () => `recommend/popular/news`,
    recomment: (limit?: number) => `recommend/user/news?limit=${limit ? limit : 5}`
  },
  rewatch: {
    list: ({
      limit,
      page,
      search,
      rematch_ids
    }: {
      limit?: string;
      page?: number;
      search?: string;
      rematch_ids?: string;
    }) => {
      return (
        'rematchs?' +
        (limit !== undefined ? `limit=${limit}` : ``) +
        (page !== undefined ? `&page=${page}` : ``) +
        (search !== undefined ? `&search=${search}` : ``) +
        (rematch_ids !== undefined ? `&rematch_ids=${rematch_ids}` : ``)
      );
    },
    count: ({ search }: { search?: string }) =>
      `rematchs/count${search ? '&search=' + search : ''}`,
    detail: ({ id }: { id: string }) => `rematchs/${id}`,
    hot: () => `recommend/popular/rematch`,
    recomment: (limit?: number) => `recommend/user/rematch?limit=${limit ? limit : 5}`
  },
  live: {
    list: ({
      limit,
      page,
      isLive,
      isFeatured
    }: {
      limit?: number;
      page?: number;
      isLive?: boolean;
      isFeatured?: boolean;
    }) =>
      `matchs?limit=${limit ? limit : 1}&page=${page ? page : 1}${isLive ? '&status=live' : ''}${isFeatured ? '&is_featured' : ''}`,
    meta: (liveId: string) => `matchs/${liveId}/meta`
  },
  auth: {
    login: () => `auth/login`,
    register: () => `auth/register`,
    me: () => `me`,
    submitForgotPassword: () => `news/count`,
    resetPassword: () => `news/count`,
  },
  feedback: {
    feedbackUser: () => `recommend/feedback`,
    feedbackAnonymous: () => `recommend/anonymous/feedback`
  },
};
