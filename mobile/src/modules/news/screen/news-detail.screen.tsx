import { ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from '../../../hook/theme.hook';
import { useService } from '../../../hook/service.hook';
import { AppTheme } from '../../../theme/theme';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { getNewsDetail } from '../api/get-news-detail.api';
import RenderHtml from 'react-native-render-html';

export const NewsDetailScreen = () => {
  const { apiService: api } = useService();
  const theme = useTheme();
  const styles = initStyles(theme);
  const [news, setNews] = useState<any>();
  const { params } = useRoute();

  const getData = () => {
    getNewsDetail(api, params?.newsId).subscribe((data) => {
      setNews(data.content);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView style={styles.flatList}>
      {news ? <RenderHtml contentWidth={theme.fullWidth - 16} source={{ html: news }} /> : <></>}
    </ScrollView>
  );
};

const initStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    flatList: {
      backgroundColor: theme.backgroundColor,
      flex: 1,
      paddingHorizontal: theme.spaceS,
    },
  });
};
