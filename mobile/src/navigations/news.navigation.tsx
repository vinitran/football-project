import React from 'react';
import { ScreenStack } from '../interface/screen-stack.interface';
import { screens } from './const/screens.const';
import { StackNavigation } from './components/stack.navigation';
import { NewsListScreen } from '../modules/news/screen/news-list.screen';
import { NewsDetailScreen } from '../modules/news/screen/news-detail.screen';

const homeScreens: ScreenStack[] = [
  {
    route: screens.newsList,
    component: NewsListScreen,
    options: {
      headerShown: false,
    },
  },
  {
    route: screens.newsDetail,
    component: NewsDetailScreen,
    options: {
      headerShown: false,
    },
  },
];

export const NewsNavigation = () => {
  return <StackNavigation routes={homeScreens} initialRoute={screens.matchList.name} />;
};
