import { FlatList, StyleSheet, View } from 'react-native';
import { useTheme } from '../../../hook/theme.hook';
import { Highlight } from '../../../interface/highlight.interface';
import { AppTheme } from '../../../theme/theme';
import { TabView } from '../../../components/tabview/tabview.component';
import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { highlightScreen } from '../const/route.const';
import { HighlightItem } from './highlight-item.component';
import { StackNavigationProp } from '@react-navigation/stack';

interface AnotherHighlightProps {
  hot: Highlight[];
  related: Highlight[];
}

enum Tab {
  HOT,
  RELATED,
}

interface RenderItemProps {
  item: Highlight;
}

export const AnotherHighlight = ({ hot, related }: AnotherHighlightProps) => {
  const theme = useTheme();
  const styles = initStyles(theme);
  const navigation = useNavigation<StackNavigationProp<any>>();

  const navigateToLive = (id: string) => {
    navigation.push(highlightScreen.highlightDetail.name, {
      highlightId: id,
    });
  };

  const renderItem = useCallback(
    ({ item }: RenderItemProps) => {
      return <HighlightItem news={item} onPress={navigateToLive} />;
    },
    [navigateToLive]
  );

  const HighlightList = ({ highlights }: { highlights: Highlight[] }) => {
    return (
      <FlatList
        data={highlights}
        renderItem={renderItem}
        numColumns={2}
        style={styles.flatList}
        keyExtractor={(item) => item.id}
      />
    );
  };

  const routes = useMemo(() => {
    return [
      {
        key: Tab.HOT,
        title: 'Highlight Hot',
      },
      {
        key: Tab.RELATED,
        title: 'Highlight Nổi bật',
      },
    ] as any;
  }, []);

  const renderScene = ({ route }: { route: { key: number; title: string } }) => (
    <HighlightList highlights={route.key === Tab.HOT ? hot : related} />
  );

  return (
    <View style={{ width: theme.fullWidth, flex: 1 }}>
      <TabView
        renderScene={renderScene}
        navigationState={{
          index: 0,
          routes: routes,
        }}
        sceneMap={false}
      />
    </View>
  );
};

const initStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    flatList: {
      backgroundColor: theme.backgroundColor,
      flex: 1,
    },
  });
};
