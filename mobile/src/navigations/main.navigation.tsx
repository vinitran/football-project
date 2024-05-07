import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import { TabIcon } from './components/tab-icon.component';
import { HomeNavigation } from './home.navigation';
import { NewsNavigation } from './news.navigation';
import { HighlightNavigation } from './highlight.navigation';
import { AccountNavigation } from './account.navigation';
import { useService } from '../hook/service.hook';
import { useTranslation } from '../hook/translate.hook';

interface TabNavigatorProps {
  name: string;
  icon: string;
  component: () => React.JSX.Element;
  tabName: string;
}

const TabNavigator = createBottomTabNavigator();

export const MainNavigation = () => {
  const { translateService, storageService } = useService();
  const { t } = useTranslation();

  const routes: TabNavigatorProps[] = [
    {
      name: 'home',
      icon: 'stadium',
      component: HomeNavigation,
      tabName: t('tabName.match'),
    },
    {
      name: 'highlight',
      icon: 'ball',
      component: HighlightNavigation,
      tabName: t('tabName.highlight'),
    },
    {
      name: 'news',
      icon: 'news',
      component: NewsNavigation,
      tabName: t('tabName.news'),
    },
    {
      name: 'account-tab',
      icon: 'account',
      component: AccountNavigation,
      tabName: t('tabName.account'),
    },
  ];

  const initLanguage = async () => {
    const appLanguage = await storageService.getAppLanguageType();
    if (!appLanguage || appLanguage === 'vi') {
      return;
    }

    translateService.changeLanguage(appLanguage);
  };

  useEffect(() => {
    initLanguage();
  }, [storageService, translateService]);

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
