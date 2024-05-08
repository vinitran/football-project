import React from 'react';
import { ScreenStack } from '../interface/screen-stack.interface';
import { screens } from './const/screens.const';
import { StackNavigation } from './components/stack.navigation';
import { AccountScreen } from '../modules/account/screen/account.screen';
import { LoginScreen } from '../modules/account/screen/login.screen';
import { RegisterScreen } from '../modules/account/screen/register.screen';
import { SettingScreen } from '../modules/account/screen/setting.screen';

const homeScreens: ScreenStack[] = [
  {
    route: screens.account,
    component: AccountScreen,
  },
  {
    route: screens.login,
    component: LoginScreen,
  },
  {
    route: screens.register,
    component: RegisterScreen,
  },
  {
    route: screens.setting,
    component: SettingScreen,
  },
];

export const AccountNavigation = () => {
  return <StackNavigation routes={homeScreens} initialRoute={screens.account.name} />;
};
