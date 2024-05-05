// export const baseURL: string = 'https://api.vebo.xyz/api/';
export const baseURL: string = 'http://94.72.119.5:3030/api/v1/';

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
    detail: ({ id }: { id: string }) => `news/${id}`,
    relative: ({ id }: { id: string }) => `news/${id}/neighbors`,
    hot: () => `recommend/popular/news`
  },
  rewatch: {
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
        'rematchs?' +
        (limit !== undefined ? `limit=${limit}` : ``) +
        (page !== undefined ? `&page=${page}` : ``) +
        (search !== undefined ? `&search=${search}` : ``) +
        (news_ids !== undefined ? `&news_ids=${news_ids}` : ``)
      );
    },
    detail: ({ id }: { id: string }) => `rematchs/${id}`,
    hot: () => `recommend/popular/rematch`
  },
  relative: {}
};
