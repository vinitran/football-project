import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { TabIcon } from './components/tab-icon.component';
import { MatchListScreen } from '../modules/home/screen/match-list.screen';
import { HomeNavigation } from './home.navigation';
import { NewsNavigation } from './news.navigation';
import { HighlightNavigation } from './highlight.navigation';

interface TabNavigatorProps {
  name: string;
  icon: string;
  component: () => React.JSX.Element;
  tabName: string;
}

const TabNavigator = createBottomTabNavigator();

export const MainNavigation = () => {
  const theme = useTheme();
  const routes: TabNavigatorProps[] = [
    {
      name: 'bridge',
      icon: 'bridge',
      component: HomeNavigation,
      tabName: 'Home',
    },
    {
      name: 'faucet',
      icon: 'faucet',
      component: HighlightNavigation,
      tabName: 'Highlight',
    },
    {
      name: 'swap',
      icon: 'swap-outline',
      component: NewsNavigation,
      tabName: 'News',
    },

    // {
    //   name: 'account',
    //   icon: 'account',
    //   component: AccountScreen,
    //   tabName: 'Account',
    // },
  ];

  return (
    <TabNavigator.Navigator screenOptions={{ tabBarHideOnKeyboard: true, headerShown: false }}>
      {routes.map((route) => (
        <TabNavigator.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{
            tabBarLabel: route.tabName,
            tabBarIcon: ({ color, size }) => (
              <TabIcon
                color={color}
                name={route.icon}
                style={{ width: size, height: size }}
                disable={true}
              />
            ),
          }}
        />
      ))}
    </TabNavigator.Navigator>
  );
};
