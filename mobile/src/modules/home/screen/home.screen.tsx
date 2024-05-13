import { View } from 'react-native';
import { TabView } from '../../../components/tabview/tabview.component';
import { useTranslation } from '../../../hook/translate.hook';
import { MatchListScreen } from './match-list.screen';
import { MatchReviewScreen } from './match-review.screen';
import { MatchScheduleScreen } from './match-schedule.screen';
import { useTheme } from '../../../hook/theme.hook';

enum HomeTab {
  LIVE,
  WATCH,
  SCHEDULE,
}

export const HomeScreen = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const routes = [
    {
      key: HomeTab.LIVE,
      title: t('match.live'),
    },
    {
      key: HomeTab.SCHEDULE,
      title: t('match.schedule'),
    },
    {
      key: HomeTab.WATCH,
      title: t('match.rematch'),
    },
  ];

  const renderScene = {
    [HomeTab.LIVE]: MatchListScreen,
    [HomeTab.WATCH]: MatchReviewScreen,
    [HomeTab.SCHEDULE]: MatchScheduleScreen,
  };

  return (
    <View style={{ flex: 1, paddingTop: theme.spaceS, backgroundColor: theme.backgroundColor }}>
      <TabView
        renderScene={renderScene}
        navigationState={{
          index: 0,
          routes: routes as any[],
        }}
      />
    </View>
  );
};
