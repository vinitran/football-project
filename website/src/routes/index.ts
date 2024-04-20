import { NewPage } from '../pages/new-page';
import { HomePage } from '../pages/home-page';
import { TestPage } from '../pages/test-page';
import { createBrowserRouter } from 'react-router-dom';
import { Test2Page } from '../pages/test2-page';
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
  },
  {
    path: '/test2',
    Component: Test2Page
  }
]);
