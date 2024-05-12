import { View } from 'react-native';
import { useTheme } from '../../../hook/theme.hook';
import { TabView } from '../../../components/tabview/tabview.component';
import { useMemo } from 'react';
import { useTranslation } from '../../../hook/translate.hook';
import { LiveMatchComment } from './live-match-comment.component';
import { AnotherLiveMatch } from './another-live-match.component';

enum Tab {
  COMMENT,
  OTHER,
}

export const LiveMatchTabView = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const routes = useMemo(() => {
    return [
      {
        key: Tab.COMMENT,
        title: t('match.comment'),
      },
      {
        key: Tab.OTHER,
        title: t('match.another_match'),
      },
    ] as any;
  }, [t]);

  const renderScene = {
    [Tab.COMMENT]: LiveMatchComment,
    [Tab.OTHER]: AnotherLiveMatch,
  };

  return (
    <View style={{ width: theme.fullWidth, flex: 1 }}>
      <TabView
        renderScene={renderScene}
        navigationState={{
          index: 0,
          routes: routes,
        }}
      />
    </View>
  );
};
