import { NewPage } from 'pages/new-page';
import { HomePage } from '../pages/home-page';

export const router = [
  {
    path: '/',
    element: HomePage,
    children: [{ path: '/home', element: HomePage }]
  },
  {
    path: '/new',
    element: NewPage
  }
];
