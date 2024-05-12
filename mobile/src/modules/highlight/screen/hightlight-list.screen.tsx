import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '../../../hook/theme.hook';
import { useService } from '../../../hook/service.hook';
import { AppTheme } from '../../../theme/theme';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getHighlightList } from '../api/get-highlight-list.api';
import { HighlightItem } from '../components/highlight-item.component';
import { NewsHighlightItem } from '../components/highlight-highlight-item.component';
import { useNavigation } from '@react-navigation/native';
import { highlightScreen } from '../const/route.const';
import { Highlight } from '../../../interface/highlight.interface';
import { useTranslation } from '../../../hook/translate.hook';
import { Icon } from '../../../components/icon/icon.component';
import { getHighlightSearch } from '../api/get-highlight-search.api';

interface RenderItemProps {
  item: Highlight;
}

export const HighlightListScreen = () => {
  const { t } = useTranslation();
  const { apiService: api } = useService();
  const theme = useTheme();
  const styles = initStyles(theme);
  const navigation = useNavigation();

  const [highlightList, setHighlightList] = useState<Highlight[]>([]);
  const [hightLight, setHighlight] = useState<Highlight>();
  const [search, setSearch] = useState<string>();
  const [isLoading, setLoading] = useState(false);
  const [isInitData, setInitData] = useState(false);
  const highlightListRef = useRef<Highlight[]>([]);

  const pageNum = useRef(1);

  const getData = () => {
    if (isLoading) return;

    setLoading(true);

    getHighlightList(api, pageNum.current).subscribe((data) => {
      setHighlightList([...highlightList, ...data.list]);
      highlightListRef.current = [...highlightList, ...data.list];

      pageNum.current == 1 && setHighlight(data.highlight);
      pageNum.current = pageNum.current + 1;

      setLoading(false);
      setInitData(true);
    });
  };

  const getSearchData = (searchText?: string) => {
    setLoading(true);
    getHighlightSearch(api, searchText).subscribe({
      next: (data) => {
        setHighlightList(data.list);
        setLoading(false);
      },
      complete: () => setLoading(false),
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

  const onChangeSearch = (value: string) => {
    setSearch(value);
    if (!value || !value.length) {
      return setHighlightList(highlightListRef.current);
    }

    getSearchData(value);
  };

  const ListHeaderComponent = () => {
    if (!!search || !!search?.length || !hightLight) return;

    return <NewsHighlightItem news={hightLight} onPress={navigateToLive} />;
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
          placeholder={t('highlight.placeholder')}
          placeholderTextColor={theme.neutralColor400}
          style={styles.input}
        />
        <Icon name="search" />
      </View>
      <FlatList
        data={highlightList}
        renderItem={renderItem}
        numColumns={2}
        style={styles.flatList}
        ListHeaderComponent={ListHeaderComponent}
        onEndReachedThreshold={0.5}
        onEndReached={getData}
        keyExtractor={(item) => item.id}
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
