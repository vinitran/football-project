import { NewPage } from '../pages/news/news-page';
import { HomePage } from '../pages/home-page';
import { TestPage } from '../pages/test-page';
import { createBrowserRouter } from 'react-router-dom';
import { Test2Page } from '../pages/test2-page';
import { LayoutWithNavBar } from '../components/layouts/layout-with-nav-bar';
import { NewsDetailPage } from '../pages/news/news-detail-page';
export const router = createBrowserRouter([
  {
    path: '/',
    Component: LayoutWithNavBar,
    children: [
      { path: '/', Component: HomePage },
      { path: '/home', Component: HomePage },
      { path: '/schedule-battle', Component: HomePage },
      { path: '/new', Component: NewPage },
      { path: '/new-detail/:id', Component: NewsDetailPage },
      { path: '/test', Component: TestPage },
      { path: '/test2', Component: Test2Page }
    ]
  }
]);
