import { useCallback, useEffect, useState } from 'react';
import { useTheme } from '../../../hook/theme.hook';
import { Match } from '../../../interface/match.interface';
import { FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { homeScreens } from '../const/route.const';
import { MatchCard } from './match-card.component';
import { AppTheme } from '../../../theme/theme';
import { useService } from '../../../hook/service.hook';
import { getFutureMatch } from '../api/get-future-match.api';

interface RenderItemProps {
  item: Match;
}

export const AnotherLiveMatch = () => {
  const { apiService: api } = useService();
  const theme = useTheme();
  const styles = initStyles(theme);
  const navigation = useNavigation();

  const [matches, setMatches] = useState<Match[]>();

  useEffect(() => {
    getFutureMatch(api).subscribe((matches) => setMatches(matches));
  });

  const navigateToLive = (match: Match) => {
    navigation.navigate(homeScreens.matchDetail.name, {
      matchId: match.id,
    });
  };

  const renderItem = useCallback(
    ({ item }: RenderItemProps) => {
      return <MatchCard match={item} onPress={navigateToLive} />;
    },
    [navigateToLive]
  );

  return <FlatList data={matches} renderItem={renderItem} style={styles.flatList} />;
};

const initStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.secondaryColor50,
      alignItems: 'center',
    },
    matchName: {
      color: theme.neutralColor900,
      fontSize: theme.fontM,
      fontWeight: '700',
      marginVertical: theme.spaceMS,
      paddingHorizontal: theme.spaceS,
      textAlign: 'left',
      width: '100%',
    },
    anotherMatch: {
      color: theme.neutralColor900,
      fontWeight: '600',
      marginBottom: theme.spaceMS,
      paddingHorizontal: theme.spaceS,
      textAlign: 'right',
      width: '100%',
    },
    flatList: {
      flex: 1,
      width: '100%',
      paddingHorizontal: theme.spaceS,
    },
  });
};
