import { TabView } from '../../../components/tabview/tabview.component';
import { useTranslation } from '../../../hook/translate.hook';
import { MatchListScreen } from './match-list.screen';
import { MatchReviewScreen } from './match-review.screen';
import { MatchScheduleScreen } from './match-schedule.screen';

enum HomeTab {
  LIVE,
  WATCH,
  SCHEDULE,
}

export const HomeScreen = () => {
  const { t } = useTranslation();
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
    <TabView
      renderScene={renderScene}
      navigationState={{
        index: 0,
        routes: routes as any[],
      }}
    />
  );
};
