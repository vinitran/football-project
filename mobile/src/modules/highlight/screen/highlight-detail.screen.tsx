import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../hook/theme.hook';
import { useService } from '../../../hook/service.hook';
import { AppTheme } from '../../../theme/theme';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { getNewsDetail } from '../api/get-highlight-detail.api';
import { Highlight } from '../../../interface/highlight.interface';
import { VideoPlayer } from '../../../components/video-player/video-player.component';
import { AnotherHighlight } from '../components/another-highlight.component';

export const HighlightDetailScreen = () => {
  const { apiService: api } = useService();
  const theme = useTheme();
  const styles = initStyles(theme);
  const [hightlight, setHightlight] = useState<Highlight>();
  const [hightlightRelated, setHightlightRelated] = useState<Highlight[]>();
  const [hightlightHot, setHightlightHot] = useState<Highlight[]>();
  const { params } = useRoute();

  const getData = () => {
    getNewsDetail(api, params?.highlightId).subscribe((data) => {
      setHightlight(data.data);
      setHightlightHot(data.data_hot);
      setHightlightRelated(data.data_related);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <VideoPlayer uri={hightlight?.video_url} />
      <Text style={styles.matchName}>{hightlight?.h1}</Text>
      <AnotherHighlight hot={hightlightHot ?? []} related={hightlightRelated ?? []} />
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
