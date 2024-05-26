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
import { LiveDetailPage } from '../pages/lives/live-detail-page';
import { LivePage } from '../pages/lives/live-page';
import { ForgotPasswordPage } from '../pages/sub-pages/forgot-password-page';
import { SubmitedForgotPasswordPage } from '../pages/sub-pages/submited-forgot-password-page';
export const router = createBrowserRouter([
  {
    path: '/',
    Component: LayoutWithNavBar,
    children: [
      { path: '/', Component: LivePage },
      { path: '/watch/:id', Component: LiveDetailPage },
      { path: '/home', Component: LivePage },
      { path: '/schedule-battle', Component: LivePage },
      { path: '/new', Component: NewPage },
      { path: '/new-detail/:id', Component: NewsDetailPage },
      { path: '/rewatch', Component: RewatchPage },
      { path: '/rewatch-detail/:id', Component: RewatchDetailPage },
      { path: '/forgot-password', Component: ForgotPasswordPage },
      { path: '/submited-forgot-password', Component: SubmitedForgotPasswordPage },
      { path: '/test', Component: LivePage },
      { path: '/test2', Component: Test2Page }
    ]
  }
]);
