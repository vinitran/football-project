import React from 'react';
import { ScreenStack } from '../interface/screen-stack.interface';
import { screens } from './const/screens.const';
import { MatchListScreen } from '../modules/home/screen/match-list.screen';
import { StackNavigation } from './components/stack.navigation';
import { MatchDetailScreen } from '../modules/home/screen/match-detail.screen';
import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';

const homeScreens: ScreenStack[] = [
  {
    route: screens.matchList,
    component: MatchListScreen,
    options: {
      headerShown: false,
    },
  },
  {
    route: screens.matchDetail,
    component: MatchDetailScreen,
  },
];

export const HomeNavigation = () => {
  const navigation = useNavigation();
  const route = useRoute();

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === screens.matchDetail.name) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);

  return <StackNavigation routes={homeScreens} initialRoute={screens.matchList.name} />;
};
