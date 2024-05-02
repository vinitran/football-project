import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useService } from '../../../hook/service.hook';
import { useTheme } from '../../../hook/theme.hook';
import { AppTheme } from '../../../theme/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { getLiveMetadata } from '../api/get-live-metadata.api';
import { Match } from '../../../interface/match.interface';
import { getVideoUrl } from '../../../utils/app.helper';
import { VideoPlayer } from '../../../components/video-player/video-player.component';
import { switchMap, tap } from 'rxjs';
import { MatchCard } from '../components/match-card.component';
import { getFutureMatch } from '../api/get-future-match.api';

interface RenderItemProps {
  item: Match;
}

export const MatchDetailScreen = () => {
  const { apiService: api } = useService();
  const { params } = useRoute();
  const theme = useTheme();
  const styles = initStyles(theme);

  const [matches, setMatches] = useState<Match[]>();
  const [streamUri, setUri] = useState<string>();
  const navigation = useNavigation();

  const matchParams = params?.match as Match;

  useEffect(() => {
    getLiveMetadata(api, matchParams?.id)
      .pipe(
        tap((match) => {
          if (!match?.play_urls || match.play_urls.length < 1) {
            return;
          }

          const url = getVideoUrl(match.play_urls);
          const updatedUrl = url
            ? url.replace(/playlist\.m3u8|index\.m3u8/g, 'chunklist.m3u8')
            : '';
          const proxyUrl = `https://stream.vinitran1245612.workers.dev?apiurl=${updatedUrl}&is_m3u8=true`;
          setUri(proxyUrl);
        }),
        switchMap(() => {
          return getFutureMatch(api);
        })
      )
      .subscribe((matches) => {
        console.log(JSON.stringify(matches));
        setMatches(matches);
      });
  }, []);

  const navigateToLive = (match: Match) => {
    navigation.navigate(homeScreens.matchDetail.name, {
      match,
    });
  };

  const renderItem = useCallback(
    ({ item }: RenderItemProps) => {
      return <MatchCard match={item} onPress={navigateToLive} />;
    },
    [navigateToLive]
  );

  return (
    <View style={styles.container}>
      <VideoPlayer uri={streamUri} isLive={true} />
      <Text style={styles.matchName}>
        {matchParams?.home.name +
          ' - ' +
          matchParams?.away.name +
          ' | ' +
          matchParams?.tournament.name}
      </Text>
      <Text style={styles.anotherMatch}>Các trận đấu khác</Text>
      <FlatList data={matches} renderItem={renderItem} style={styles.flatList} />
    </View>
  );
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
