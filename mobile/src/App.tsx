import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';

import { MainNavigation } from './navigations/main.navigation';
import { ThemeProvider } from './theme/theme.provider';
import { Appearance } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppWrapper } from './components/app-wrapper/app-wrapper.component';
import { AppProvider } from './providers/app.provider';

function App(): React.JSX.Element {
  useEffect(() => {
    Appearance.setColorScheme('light');
  }, []);

  return (
    <Provider store={store}>
      <AppWrapper>
        <NavigationContainer>
          <ThemeProvider>
            <AppProvider>
              <MainNavigation />
            </AppProvider>
          </ThemeProvider>
        </NavigationContainer>
      </AppWrapper>
    </Provider>
  );
}

export default App;
