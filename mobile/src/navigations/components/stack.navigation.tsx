import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { ReactNode } from 'react';
import { ScreenStack } from '../../interface/screen-stack.interface';
import { useTranslation } from '../../hook/translate.hook';

const Stack = createStackNavigator();

export interface StackNavigationProps {
  initialRoute: string;
  routes: ScreenStack[];
  options?: StackNavigationOptions;
}

export const StackNavigation = (props: StackNavigationProps) => {
  const { t } = useTranslation();
  const defaultProps = {
    safeAreaInsets: { top: 0 },
  };

  return (
    <Stack.Navigator
      initialRouteName={props.initialRoute}
      screenOptions={{ ...defaultProps, ...props.options, headerMode: 'screen' }}
    >
      {props.routes.map((screen) => (
        <Stack.Screen
          key={screen.route.name}
          name={screen.route.name}
          component={screen.component as any}
          options={{
            title: t(screen.route.title),
            ...screen.options,
          }}
        />
      ))}
    </Stack.Navigator>
  );
};
