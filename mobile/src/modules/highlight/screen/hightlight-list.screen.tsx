import { FlatList, StyleSheet, View } from 'react-native';
import { useTheme } from '../../../hook/theme.hook';
import { useService } from '../../../hook/service.hook';
import { AppTheme } from '../../../theme/theme';
import { useCallback, useEffect, useState } from 'react';
import { News } from '../../../interface/news.interface';
import { getHighlightList } from '../api/get-highlight-list.api';
import { HighlightItem } from '../components/highlight-item.component';
import { NewsHighlightItem } from '../components/highlight-highlight-item.component';
import { useNavigation } from '@react-navigation/native';
import { highlightScreen } from '../const/route.const';
import { Highlight } from '../../../interface/highlight.interface';

interface RenderItemProps {
  item: Highlight;
}

export const HighlightListScreen = () => {
  const { apiService: api } = useService();
  const theme = useTheme();
  const styles = initStyles(theme);
  const navigation = useNavigation();

  const [pageNum, setPageNum] = useState(0);
  const [highlightList, setHighlightList] = useState<Highlight[]>([]);
  const [hightLight, setHighlight] = useState<Highlight>();
  const [isLoading, setLoading] = useState(false);

  const getData = () => {
    if (isLoading) return;

    setLoading(true);

    getHighlightList(api, pageNum).subscribe((data) => {
      setHighlightList((prevState) => prevState.concat(data.list));
      pageNum == 0 && setHighlight(data.highlight);
      setPageNum((prev) => prev++);

      setLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const navigateToLive = (id: string) => {
    navigation.navigate(highlightScreen.highlightDetail.name, {
      highlightId: id,
    });
  };

  const renderItem = useCallback(
    ({ item }: RenderItemProps) => {
      return <HighlightItem news={item} onPress={navigateToLive} />;
    },
    [navigateToLive]
  );

  const ListHeaderComponent = () => {
    if (!hightLight) return;

    return <NewsHighlightItem news={hightLight} onPress={navigateToLive} />;
  };

  return (
    <View style={styles.flatList}>
      <FlatList
        data={highlightList}
        renderItem={renderItem}
        numColumns={2}
        style={styles.flatList}
        ListHeaderComponent={ListHeaderComponent}
        onEndReachedThreshold={0.5}
        onEndReached={getData}
        keyExtractor={(item) => item.id}
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
