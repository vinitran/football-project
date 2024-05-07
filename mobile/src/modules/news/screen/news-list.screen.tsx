import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
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
import { getNewsSearch } from '../api/get-news-search.api';
import { useTranslation } from '../../../hook/translate.hook';
import { Icon } from '../../../components/icon/icon.component';

interface RenderItemProps {
  item: News;
}

export const NewsListScreen = () => {
  const { apiService: api } = useService();
  const theme = useTheme();
  const styles = initStyles(theme);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [newsList, setNewsList] = useState<News[]>([]);
  const [newsHightLight, setNewsHighlight] = useState<News>();
  const [search, setSearch] = useState<string>();
  const [isLoading, setLoading] = useState(false);
  const [isInitData, setInitData] = useState(false);
  const pageNum = useRef(1);
  const newsListRef = useRef<News[]>([]);
  const ITEM_HEIGHT = (theme.fullWidth - 64) / 2 + 24;

  const getData = () => {
    if (isLoading) return;

    setLoading(true);

    getNewsList(api, pageNum.current).subscribe((data) => {
      setNewsList([...newsList, ...data.list]);
      newsListRef.current = [...newsList, ...data.list];
      pageNum.current == 1 && setNewsHighlight(data.highlight);
      pageNum.current = pageNum.current + 1;

      setLoading(false);
      setInitData(true);
    });
  };

  const getSearchData = (searchText?: string) => {
    setLoading(true);
    getNewsSearch(api, searchText).subscribe({
      next: (data) => {
        setNewsList(data.list);
        setLoading(false);
      },
      complete: () => setLoading(false),
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const onChangeSearch = (value: string) => {
    setSearch(value);
    if (!value || !value.length) {
      return setNewsList(newsListRef.current);
    }

    getSearchData(value);
  };

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
    if (!!search || !!search?.length || !newsHightLight) return;

    return <NewsHighlightItem news={newsHightLight} onPress={navigateToLive} />;
  };

  const ListEmptyComponent = () => {
    if (!isInitData || isLoading) return <></>;

    return (
      <View style={styles.nodata}>
        <Icon name="nodata" style={styles.icon} />
        <Text style={styles.text}>{t('news.no_data')}</Text>
      </View>
    );
  };

  return (
    <View style={styles.flatList}>
      <View style={styles.inputWrapper}>
        <TextInput
          onChangeText={onChangeSearch}
          placeholder={t('news.placeholder')}
          placeholderTextColor={theme.neutralColor400}
          style={styles.input}
        />
        <Icon name="search" />
      </View>
      <FlatList
        data={newsList}
        renderItem={renderItem}
        numColumns={2}
        style={styles.flatList}
        ListHeaderComponent={ListHeaderComponent}
        onEndReachedThreshold={0.5}
        onEndReached={getData}
        keyExtractor={(item) => item.id}
        removeClippedSubviews
        maxToRenderPerBatch={12}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        refreshing={isLoading}
        ListEmptyComponent={ListEmptyComponent}
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
    inputWrapper: {
      marginHorizontal: theme.spaceS,
      borderRadius: theme.radiusS,
      borderColor: theme.primaryColor,
      borderWidth: 1,
      paddingHorizontal: theme.spaceS,
      marginVertical: theme.spaceS,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
    },
    icon: {
      width: 80,
      height: 80,
    },
    nodata: {
      width: '100%',
      marginTop: theme.spaceML,
      alignItems: 'center',
    },
    text: {
      fontSize: theme.fontL,
      color: theme.neutralColor700,
    },
  });
};
