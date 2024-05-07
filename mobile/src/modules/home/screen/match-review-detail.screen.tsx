import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../hook/theme.hook';
import { useService } from '../../../hook/service.hook';
import { AppTheme } from '../../../theme/theme';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Highlight } from '../../../interface/highlight.interface';
import { VideoPlayer } from '../../../components/video-player/video-player.component';
import { getReviewMatchDetail } from '../api/get-review-match-detail.api';
import { AnotherReviewMatch } from '../components/another-review-match.component';
import { StackNavigationProp } from '@react-navigation/stack';
import { removeCommentorName } from '../../../utils/string.helper';

export const MatchReviewDetailScreen = () => {
  const { apiService: api } = useService();
  const theme = useTheme();
  const styles = initStyles(theme);
  const [hightlight, setHightlight] = useState<Highlight>();
  const [hightlightRelated, setHightlightRelated] = useState<Highlight[]>();
  const [hightlightHot, setHightlightHot] = useState<Highlight[]>();
  const { params } = useRoute();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const getData = () => {
    getReviewMatchDetail(api, params?.highlightId).subscribe((data) => {
      navigation.setOptions({
        title: data.data.h1,
      });
      setHightlight(data.data);
      setHightlightHot(data.data_hot);
      setHightlightRelated(data.data_related);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(hightlight?.video_url);

  return (
    <View style={styles.container}>
      <VideoPlayer uri={hightlight?.video_url} />
      <Text style={styles.matchName}>{removeCommentorName(hightlight?.h1)}</Text>
      <AnotherReviewMatch hot={hightlightHot ?? []} related={hightlightRelated ?? []} />
    </View>
  );
};

const initStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
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
