import { NewPage } from '../pages/news/news-page';
import { HomePage } from '../pages/home-page';
import { TestPage } from '../pages/test-page';
import { createBrowserRouter } from 'react-router-dom';
import { Test2Page } from '../pages/test2-page';
import { LayoutWithNavBar } from '../components/layouts/layout-with-nav-bar';
import { WatchPage } from '../pages/watch-page';
import { NewsDetailPage } from '../pages/news/news-detail-page';
import { RewatchPage } from '../pages/rewatch/rewatch-page';
import { RewatchDetailPage } from '../pages/rewatch/rewatch-detail-page';
export const router = createBrowserRouter([
  {
    path: '/',
    Component: LayoutWithNavBar,
    children: [
      { path: '/', Component: HomePage },
      { path: '/watch/:id', Component: WatchPage },
      { path: '/home', Component: HomePage },
      { path: '/schedule-battle', Component: HomePage },
      { path: '/new', Component: NewPage },
      { path: '/new-detail/:id', Component: NewsDetailPage },
      { path: '/rewatch', Component: RewatchPage },
      { path: '/rewatch-detail/:id', Component: RewatchDetailPage },
      { path: '/test', Component: TestPage },
      { path: '/test2', Component: Test2Page }
    ]
  }
]);
