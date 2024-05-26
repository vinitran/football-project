import { ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from '../../../hook/theme.hook';
import { useService } from '../../../hook/service.hook';
import { AppTheme } from '../../../theme/theme';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { getNewsDetail } from '../api/get-news-detail.api';
import RenderHtml from 'react-native-render-html';
import { LoadingSpinner } from '../../../components/loading-indicator/loading-indicator.component';
import { finalize, switchMap, tap } from 'rxjs';
import { useAppSelector } from '../../../store/store';
import { postNewFeedBackUser } from '../api/post-feedback-news-user.api';
import { postNewFeedBackAnynomus } from '../api/post-feedback-news-anynomus.api';

export const NewsDetailScreen = () => {
  const { apiService: api } = useService();
  const theme = useTheme();
  const styles = initStyles(theme);
  const [news, setNews] = useState<any>();
  const [isLoading, setLoading] = useState<any>();
  const { params } = useRoute();

  const { accessToken } = useAppSelector((state) => state.user);

  const getData = () => {
    setLoading(true);
    getNewsDetail(api, params?.newsId)
      .pipe(
        tap((data) => {
          setNews(data.content);
        }),
        finalize(() => setLoading(false)),
        switchMap(() => {
          return !!accessToken
            ? postNewFeedBackUser(api, {
                FeedbackType: 'read',
                ItemId: params?.newsId,
              })
            : postNewFeedBackAnynomus(api, {
                FeedbackType: 'read',
                ItemId: params?.newsId,
              });
        })
      )
      .subscribe(() => {});
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView style={styles.flatList}>
      <LoadingSpinner isVisible={isLoading} />
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
