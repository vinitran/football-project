interface INavbar {
  name: string;
  label: string;
  url: string;
}

export const navBarList: INavbar[] = [
  {
    name: 'new',
    label: 'Tin tức',
    url: '/new'
  },
  {
    name: 'schedule-battle',
    label: 'Lịch thi đấu',
    url: '/schedule-battle'
  }
];
