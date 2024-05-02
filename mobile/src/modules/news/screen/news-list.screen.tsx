import { FlatList, StyleSheet, View } from 'react-native';
import { useTheme } from '../../../hook/theme.hook';
import { useService } from '../../../hook/service.hook';
import { AppTheme } from '../../../theme/theme';
import { useCallback, useEffect, useRef, useState } from 'react';
import { News } from '../../../interface/news.interface';
import { getNewsList } from '../api/get-news-list.api';
import { NewsItem } from '../components/news-item.component';
import { NewsHighlightItem } from '../components/news-highlight-item.component';
import { useNavigation } from '@react-navigation/native';
import { newsScreens } from '../const/route.const';

interface RenderItemProps {
  item: News;
}

export const NewsListScreen = () => {
  const { apiService: api } = useService();
  const theme = useTheme();
  const styles = initStyles(theme);
  const navigation = useNavigation();

  const [pageNum, setPageNum] = useState(0);
  const [newsList, setNewsList] = useState<News[]>([]);
  const [newsHightLight, setNewsHighlight] = useState<News>();
  const [isLoading, setLoading] = useState(false);

  const getData = () => {
    if (isLoading) return;

    setLoading(true);

    getNewsList(api, pageNum).subscribe((data) => {
      setNewsList((prevState) => prevState.concat(data.list));
      pageNum == 0 && setNewsHighlight(data.highlight);
      setPageNum((prev) => prev++);

      setLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const navigateToLive = (id: string) => {
    navigation.navigate(newsScreens.newsDetail.name, {
      newsId: id,
    });
  };

  const renderItem = useCallback(
    ({ item }: RenderItemProps) => {
      return <NewsItem news={item} onPress={navigateToLive} />;
    },
    [navigateToLive]
  );

  const ListHeaderComponent = () => {
    if (!newsHightLight) return;

    return <NewsHighlightItem news={newsHightLight} onPress={navigateToLive} />;
  };

  return (
    <View style={styles.flatList}>
      <FlatList
        data={newsList}
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
