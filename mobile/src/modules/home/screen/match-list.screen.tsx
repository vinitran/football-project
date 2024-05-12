import { useCallback, useEffect, useState } from 'react';
import { useService } from '../../../hook/service.hook';
import { getFutureMatch } from '../api/get-future-match.api';
import { FlatList, StyleSheet, View } from 'react-native';
import { forkJoin, map, of, switchMap, take } from 'rxjs';
import { getLiveMatch } from '../api/get-live-match.api';
import { Match } from '../../../interface/match.interface';
import { useTheme } from '../../../hook/theme.hook';
import { AppTheme } from '../../../theme/theme';
import { MatchCard } from '../components/match-card.component';
import { homeScreens } from '../const/route.const';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

interface RenderItemProps {
  item: Match;
}

export const MatchListScreen = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setLoading] = useState(false);

  const { apiService: api } = useService();
  const theme = useTheme();
  const styles = initStyles(theme);
  const navigation = useNavigation();

  const getData = () => {
    if (isLoading) return;

    setLoading(true);
    forkJoin([getFutureMatch(api), getLiveMatch(api)])
      .pipe(
        map(([futureMatch, liveMatch]) => {
          const liveMap = new Map(liveMatch?.map((item) => [item.id, item]));
          const futureMap = futureMatch?.map((item) =>
            liveMap.has(item.id) ? liveMap.get(item.id)! : item
          );

          return futureMap;
        }),
        take(1)
      )
      .subscribe({
        next: (match) => {
          setMatches(match);
        },
        complete: () => setLoading(false),
      });
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const navigateToLive = (match: Match) => {
    navigation.navigate(homeScreens.matchDetail.name, {
      matchId: match.id,
    });
  };

  const navigateToMatchBook = (match: Match) => {
    navigation.navigate(homeScreens.matchBooking.name, {
      match,
    });
  };

  const renderItem = useCallback(
    ({ item }: RenderItemProps) => {
      return (
        <MatchCard match={item} onPress={item.is_live ? navigateToLive : navigateToMatchBook} />
      );
    },
    [navigateToLive]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={matches}
        renderItem={renderItem}
        style={styles.flatList}
        onRefresh={getData}
        refreshing={isLoading}
      />
    </View>
  );
};

const initStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.secondaryColor50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    flatList: {
      flex: 1,
      width: '100%',
      paddingHorizontal: theme.spaceS,
    },
  });
};
