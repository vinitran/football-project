import React from 'react';
import { ScreenStack } from '../interface/screen-stack.interface';
import { screens } from './const/screens.const';
import { MatchListScreen } from '../modules/home/screen/match-list.screen';
import { StackNavigation } from './components/stack.navigation';
import { MatchDetailScreen } from '../modules/home/screen/match-detail.screen';
import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';
import { MatchBookEventScreen } from '../modules/home/screen/match-book-envent.component';
import { HomeScreen } from '../modules/home/screen/home.screen';
import { MatchReviewDetailScreen } from '../modules/home/screen/match-review-detail.screen';
import { LoginScreen } from '../modules/home/screen/login.screen';
import { RegisterScreen } from '../modules/home/screen/register.screen';

const homeScreens: ScreenStack[] = [
  {
    route: screens.matchList,
    component: HomeScreen,
    options: {
      headerShown: false,
    },
  },
  {
    route: screens.matchDetail,
    component: MatchDetailScreen,
  },
  {
    route: screens.matchBooking,
    component: MatchBookEventScreen,
  },
  {
    route: screens.matchReviewDetail,
    component: MatchReviewDetailScreen,
  },
  {
    route: screens.login,
    component: LoginScreen,
  },
  {
    route: screens.register,
    component: RegisterScreen,
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
