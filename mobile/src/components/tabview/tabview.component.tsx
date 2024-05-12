import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  TextStyle,
  ViewStyle,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {
  Route as BaseRoute,
  SceneMap,
  NavigationState,
  TabView as BaseTabView,
  SceneRendererProps,
} from 'react-native-tab-view';
import { useTheme } from '../../hook/theme.hook';
import { AppTheme } from '../../theme/theme';

export interface Route extends BaseRoute {
  badgeCount?: number | string;
}

export interface TabViewProps {
  lazy?: boolean;
  renderScene: any;
  sceneMap?: boolean;
  navigationState: NavigationState<Route>;
  onIndexChange?: (index: number) => void;
  renderTabBar?: (
    props: SceneRendererProps & {
      navigationState: NavigationState<Route>;
    },
    onPressTab: (index: number) => void
  ) => React.JSX.Element;
}

export const TabView = ({
  renderScene,
  lazy = false,
  onIndexChange,
  navigationState,
  sceneMap = true,
  renderTabBar,
}: TabViewProps) => {
  const [tabIndex, setTabIndex] = useState(navigationState.index);

  useEffect(() => {
    setTabIndex(navigationState.index);
  }, [navigationState.index]);

  const tabNavigationState = useMemo(
    () => ({
      index: tabIndex,
      routes: navigationState.routes,
    }),
    [tabIndex, navigationState.routes]
  );

  const theme = useTheme();
  const styles = initStyles(theme);

  const _onIndexChange = (index: number) => {
    setTabIndex(index);
    onIndexChange && onIndexChange(index);
  };

  const TabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<Route>;
    }
  ) => {
    if (!!renderTabBar) {
      return renderTabBar(props, _onIndexChange);
    }

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const activeStyles =
            i === tabIndex
              ? {
                  tabItem: styles.activeTabItem,
                  tabItemText: styles.activeTabItemText,
                }
              : {};

          return (
            <TouchableOpacity
              key={route.key}
              style={[styles.tabItem, activeStyles.tabItem]}
              onPress={() => _onIndexChange(i)}
            >
              <Text
                style={[styles.tabItemText as TextStyle, activeStyles.tabItemText as TextStyle]}
              >
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <BaseTabView
      lazy={lazy}
      renderTabBar={TabBar}
      onIndexChange={_onIndexChange}
      navigationState={tabNavigationState}
      initialLayout={{ width: Dimensions.get('window').width }}
      renderScene={sceneMap ? SceneMap(renderScene) : renderScene}
    />
  );
};

const initStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    tabBar: {
      flexDirection: 'row',
      backgroundColor: theme.backgroundColor,
      width: '100%',
      borderBottomColor: theme.neutralColor400,
      borderBottomWidth: 2,
    },
    tabItem: {
      alignItems: 'center',
      flexDirection: 'row',
      borderBottomWidth: 2,
      justifyContent: 'center',
      paddingVertical: theme.spaceXS,
      borderColor: theme.neutralColor400,
      paddingHorizontal: theme.spaceM,
      marginBottom: -2,
    },
    tabItemText: {
      textAlign: 'center',
      color: theme.textColor,
      fontSize: theme.fontS,
    },
    activeTabItem: {
      color: theme.primaryColor,
      borderColor: theme.primaryColor,
    },
    activeTabItemText: {
      color: theme.primaryColor,
    },
    badge: {
      alignItems: 'center',
      backgroundColor: 'red',
      justifyContent: 'center',
      width: theme.spaceM,
      height: theme.spaceM,
      marginLeft: theme.spaceXXS,
      borderRadius: theme.radiusCircle,
    },
    badgeText: {
      color: 'white',
      fontSize: theme.fontXXS,
      fontWeight: 'bold',
    },
  });
};
