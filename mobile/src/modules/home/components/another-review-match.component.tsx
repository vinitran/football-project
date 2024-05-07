import { FlatList, StyleSheet, View } from 'react-native';
import { useTheme } from '../../../hook/theme.hook';
import { Highlight } from '../../../interface/highlight.interface';
import { AppTheme } from '../../../theme/theme';
import { TabView } from '../../../components/tabview/tabview.component';
import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MatchReviewItem } from './match-review-item.component';
import { homeScreens } from '../const/route.const';
import { useTranslation } from '../../../hook/translate.hook';

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

export const AnotherReviewMatch = ({ hot, related }: AnotherHighlightProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = initStyles(theme);
  const navigation = useNavigation<StackNavigationProp<any>>();

  const navigateToLive = (id: string) => {
    navigation.push(homeScreens.matchReviewDetail.name, {
      highlightId: id,
    });
  };

  const renderItem = useCallback(
    ({ item }: RenderItemProps) => {
      return <MatchReviewItem news={item} onPress={navigateToLive} />;
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
        title: t('match.hot_match'),
      },
      {
        key: Tab.RELATED,
        title: t('match.related_match'),
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
