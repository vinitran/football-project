interface INavbar {
  id: number;
  name: string;
  label: string;
  url: string;
}

export const navBarList: INavbar[] = [
  {
    id: 0,
    name: 'schedule-battle',
    label: 'Lịch thi đấu',
    url: '/schedule-battle'
  },
  {
    id: 1,
    name: 'new',
    label: 'Tin tức',
    url: '/new'
  },
  {
    id: 2,
    name: 'rewatch',
    label: 'Xem lại',
    url: '/rewatch'
  }
];
