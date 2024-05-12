import React, { useCallback } from 'react';
import { useState } from 'react';
import { useService } from '../../../hook/service.hook';
import { Image, SectionList, StyleSheet, Text, View } from 'react-native';
import { Match, Tournament } from '../../../interface/match.interface';
import { useTheme } from '../../../hook/theme.hook';
import { AppTheme } from '../../../theme/theme';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { DatePicker } from '../../../components/date-picker/date-picker.component';
import { getScheduleMatch } from '../api/get-schedule-match.api';
import { ScheduleMatchItem } from '../components/schedule-match-item.component';
import { homeScreens } from '../const/route.const';
import { LoadingSpinner } from '../../../components/loading-indicator/loading-indicator.component';

interface RenderItemProps {
  item: Match;
}

interface SectionData {
  data: Match[];
  tournament: Tournament;
  id: string;
}

const formatDateOutput = 'YYYYMMDD';
const formatDateInput = 'YYYY-MM-DD';

export const MatchScheduleScreen = () => {
  const [sectionData, setSectionData] = useState<SectionData[]>([]);
  const [isLoading, setLoading] = useState(false);
  const defaultDate = dayjs().add(1, 'day').format(formatDateInput);

  const { apiService: api } = useService();
  const theme = useTheme();
  const styles = initStyles(theme);
  const navigation = useNavigation();

  const navigateToMatchBook = (match: Match) => {
    navigation.navigate(homeScreens.matchBooking.name, {
      match,
    });
  };

  const getData = (date: string) => {
    if (isLoading) return;

    setLoading(true);
    getScheduleMatch(api, date).subscribe({
      next: (matchs) => {
        const sectionData: SectionData[] = [];
        const sectionObject: { [key: string]: Match[] } = {};

        matchs
          .sort((a, b) => b.tournament.priority - a.tournament.priority)
          .slice(0, 40)
          .forEach((match) => {
            sectionObject[match.tournament.unique_tournament.id] = [
              ...(sectionObject[match.tournament.unique_tournament.id] ?? []),
              match,
            ];
          });

        Object.keys(sectionObject).forEach((key) => {
          sectionData.push({
            tournament: sectionObject[key][0].tournament,
            data: sectionObject[key],
            id: key,
          });
        });

        setSectionData(sectionData);
      },
      complete: () => setLoading(false),
    });
  };

  const renderItem = useCallback(
    ({ item }: RenderItemProps) => {
      return <ScheduleMatchItem match={item} onPress={navigateToMatchBook} />;
    },
    [navigateToMatchBook]
  );

  const renderHeader = useCallback(
    ({ section: { data, id, tournament } }: { section: SectionData }) => {
      return (
        <View style={styles.headerWrapper}>
          <Image source={{ uri: tournament.logo }} style={styles.logo} />
          <Text style={styles.tournament}>{tournament.name}</Text>
        </View>
      );
    },
    []
  );

  return (
    <View style={styles.container}>
      <DatePicker
        startLimitDate={dayjs().add(1, 'day')}
        endLimitDate={dayjs().add(7, 'day')}
        defaultDate={defaultDate}
        onDateChange={getData}
      />
      <View style={styles.flatList}>
        <LoadingSpinner isVisible={isLoading} />
        <SectionList
          sections={sectionData}
          style={styles.flatList}
          renderItem={renderItem}
          renderSectionHeader={renderHeader}
        />
      </View>
    </View>
  );
};

const initStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.secondaryColor50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    flatList: {
      flex: 1,
      width: '100%',
    },
    headerWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spaceMS,
      paddingVertical: theme.spaceS,
      backgroundColor: theme.neutralColor50,
    },
    logo: {
      width: theme.spaceL,
      height: theme.spaceL,
      marginRight: theme.spaceMS,
    },
    tournament: {
      color: theme.textColor,
    },
  });
};
