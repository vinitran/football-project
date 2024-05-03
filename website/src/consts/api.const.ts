// export const baseURL: string = 'https://api.vebo.xyz/api/';
export const baseURL: string = '94.72.119.5:3030/api/v1/';

export const Live7Api = {
  news: {
    list: () => `news?limit=1`,
    detail: (id: string) => `news/${id}`
  },
  rewatch: {}
};
