import { NewPage } from '../pages/new-page';
import { HomePage } from '../pages/home-page';
import { TestPage } from '../pages/test-page';
import { createBrowserRouter } from 'react-router-dom';
export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
    children: [{ path: '/home', Component: HomePage }]
  },
  {
    path: '/new',
    Component: NewPage
  },
  {
    path: '/test',
    Component: TestPage
  }
]);
