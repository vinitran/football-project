import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';

import { MainNavigation } from './navigations/main.navigation';
import { ThemeProvider } from './theme/theme.provider';
import { Appearance } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppWrapper } from './components/app-wrapper/app-wrapper.component';
import { AppProvider } from './providers/app.provider';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { screens } from './navigations/const/screens.const';
import BootSplash from 'react-native-bootsplash';

GoogleSignin.configure({
  webClientId: '1027985649693-qbibsoqi1tgjoh49sn5s1pp7cndg1gq2.apps.googleusercontent.com',
});

function Layout(): React.JSX.Element {
  useEffect(() => {
    const hideSplash = async () => await BootSplash.hide({ fade: true });
    Appearance.setColorScheme('light');
    hideSplash();
  }, []);

  const linking: LinkingOptions<{}> = {
    prefixes: ['football://'],
    config: {
      screens: {
        [screens.matchDetail.name]: 'match-live/:matchId',
      },
    },
  };

  return (
    <Provider store={store}>
      <AppWrapper>
        <NavigationContainer linking={linking}>
          <ThemeProvider>
            <MainNavigation />
          </ThemeProvider>
        </NavigationContainer>
      </AppWrapper>
    </Provider>
  );
}

export function App() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
}
