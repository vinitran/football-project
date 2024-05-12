import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '../../../hook/theme.hook';
import { useService } from '../../../hook/service.hook';
import { AppTheme } from '../../../theme/theme';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Highlight } from '../../../interface/highlight.interface';
import { getReviewMatch } from '../api/get-review-match.api';
import { MatchReviewItem } from '../components/match-review-item.component';
import { MatchReviewHighlightItem } from '../components/match-review-highlight-item.component';
import { homeScreens } from '../const/route.const';
import { Icon } from '../../../components/icon/icon.component';
import { useTranslation } from '../../../hook/translate.hook';
import { getReviewMatchSearch } from '../api/get-review-match-search.api';

interface RenderItemProps {
  item: Highlight;
}

export const MatchReviewScreen = () => {
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

    getReviewMatch(api, pageNum.current).subscribe((data) => {
      setHighlightList([...highlightList, ...data.list]);
      highlightListRef.current = [...highlightList, ...data.list];
      pageNum.current == 1 && setHighlight(data.highlight);
      pageNum.current = pageNum.current + 1;

      setLoading(false);
    });
  };

  const getSearchData = (searchText?: string) => {
    setLoading(true);
    getReviewMatchSearch(api, searchText).subscribe({
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
    navigation.navigate(homeScreens.matchReviewDetail.name, {
      highlightId: id,
    });
  };

  const renderItem = useCallback(
    ({ item }: RenderItemProps) => {
      return <MatchReviewItem news={item} onPress={navigateToLive} />;
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

    return <MatchReviewHighlightItem news={hightLight} onPress={navigateToLive} />;
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
          placeholder={t('match.placeholder')}
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
