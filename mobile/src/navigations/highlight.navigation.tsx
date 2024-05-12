import React from 'react';
import { ScreenStack } from '../interface/screen-stack.interface';
import { screens } from './const/screens.const';
import { StackNavigation } from './components/stack.navigation';
import { HighlightListScreen } from '../modules/highlight/screen/hightlight-list.screen';
import { HighlightDetailScreen } from '../modules/highlight/screen/highlight-detail.screen';
import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';

const homeScreens: ScreenStack[] = [
  {
    route: screens.highlightList,
    component: HighlightListScreen,
    options: {
      headerShown: false,
    },
  },
  {
    route: screens.highlightDetail,
    component: HighlightDetailScreen,
  },
];

export const HighlightNavigation = () => {
  const navigation = useNavigation();
  const route = useRoute();

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === screens.highlightDetail.name) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);

  return <StackNavigation routes={homeScreens} initialRoute={screens.matchList.name} />;
};
