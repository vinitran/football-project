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
import { forkJoin, switchMap, take, tap } from 'rxjs';
import { MatchCard } from '../components/match-card.component';
import { getFutureMatch } from '../api/get-future-match.api';
import { getLiveData } from '../api/get-live-match-data.api';
import { LoadingSpinner } from '../../../components/loading-indicator/loading-indicator.component';
import { homeScreens } from '../const/route.const';
import { useTranslation } from '../../../hook/translate.hook';

interface RenderItemProps {
  item: Match;
}

export const MatchDetailScreen = () => {
  const { apiService: api } = useService();
  const { params } = useRoute();
  const theme = useTheme();
  const styles = initStyles(theme);

  const [matches, setMatches] = useState<Match[]>();
  const [currentMatch, setCurrentMatches] = useState<Match>();
  const [streamUri, setUri] = useState<string>();
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const matchId = params?.matchId;

  useEffect(() => {
    setLoading(true);
    forkJoin(getLiveMetadata(api, matchId), getLiveData(api, matchId), getFutureMatch(api))
      .pipe(take(1))
      .subscribe(([metadata, currentMatch, matches]) => {
        setCurrentMatches(currentMatch);
        setMatches(matches);
        if (!metadata?.play_urls || metadata.play_urls.length < 1) {
          return;
        }

        const url = getVideoUrl(metadata.play_urls);
        const updatedUrl = url ? url.replace(/playlist\.m3u8|index\.m3u8/g, 'chunklist.m3u8') : '';
        const proxyUrl = `https://stream.vinitran1245612.workers.dev?apiurl=${updatedUrl}&is_m3u8=true`;
        setUri(proxyUrl);
      });
    setLoading(false);
  }, []);

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

  return (
    <View style={styles.container}>
      <LoadingSpinner isVisible={isLoading} />
      <VideoPlayer uri={streamUri} isLive={true} />
      {currentMatch ? (
        <Text style={styles.matchName}>
          {currentMatch?.home.name +
            ' - ' +
            currentMatch?.away.name +
            ' | ' +
            currentMatch?.tournament.name}
        </Text>
      ) : (
        <></>
      )}
      {matches ? (
        <>
          <Text style={styles.anotherMatch}>{t('match.another_match')}</Text>
          <FlatList data={matches} renderItem={renderItem} style={styles.flatList} />
        </>
      ) : (
        <></>
      )}
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
