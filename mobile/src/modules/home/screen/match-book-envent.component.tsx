import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../hook/theme.hook';
import { AppTheme } from '../../../theme/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Match } from '../../../interface/match.interface';
import { Button } from '../../../components/button/button.component';
import { useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useService } from '../../../hook/service.hook';

export const MatchBookEventScreen = () => {
  const theme = useTheme();
  const styles = initStyles(theme);

  const { params } = useRoute();
  const match = params?.match as Match;
  const time = new Date(match.timestamp);
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { calendarService } = useService();

  useEffect(() => {
    if (!match) return;

    navigation.setOptions({
      title: match?.home.name + ' - ' + match?.away.name + ' | ' + match?.tournament.name,
    });
  }, [match]);

  const onBookCalendarEvent = async () => {
    if (Platform.OS === 'ios') {
      return calendarService.addToIosCalendar(
        match?.home.name + ' - ' + match?.away.name + ' | ' + match?.tournament.name,
        time.toISOString(),
        new Date(time.getTime() + 90 * 1000 * 60).toISOString(),
        `football://match-live/${match.id}`
      );
    }

    calendarService.addAndroidCalendarEvent({
      title: match?.home.name + ' - ' + match?.away.name + ' | ' + match?.tournament.name,
      // startDate: time.toISOString(),
      // endDate: new Date(time.getTime() + 90 * 1000 * 60).toISOString(),
      url: `football://match-live/${match.id}`,
      startDate: new Date(new Date().getTime() + 90 * 1000 * 2).toISOString(),
      endDate: new Date(new Date().getTime() + 90 * 1000 * 60).toISOString(),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.betweenRow}>
        <View style={styles.tournamentWrapper}>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {match.tournament.name}
          </Text>
        </View>
      </View>
      <View style={styles.aroundRow}>
        <View style={styles.teamWrapper}>
          <Image source={{ uri: match.home.logo }} style={styles.logo} resizeMode="cover" />
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.teamName}>
            {match.home.name}
          </Text>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.time}>{`${match.date.substring(6, 8)}/${match.date.substring(
            4,
            6
          )}/${match.date.substring(0, 4)}`}</Text>
          <Text style={styles.time}>
            {' '}
            {`${time.getHours().toString().padStart(2, '0')}:${time
              .getMinutes()
              .toString()
              .padStart(2, '0')}`}
          </Text>
        </View>
        <View style={styles.teamWrapper}>
          <Image source={{ uri: match.away.logo }} style={styles.logo} resizeMode="cover" />
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.teamName}>
            {match.away.name}
          </Text>
        </View>
      </View>
      <View style={styles.bookView}>
        <Button label="Đặt lịch" onPress={onBookCalendarEvent} />
      </View>
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
    betweenRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    aroundRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: theme.spaceMS,
      marginBottom: theme.spaceML,
    },
    liveContainer: {
      borderRadius: theme.radiusCircle,
      backgroundColor: '#f2152d',
      paddingHorizontal: theme.spaceS,
      paddingVertical: theme.spaceXS,
      flexDirection: 'row',
      alignItems: 'center',
    },
    wrapper: {
      borderRadius: theme.radiusMS,
      backgroundColor: theme.backgroundColor,
      paddingBottom: theme.spaceMS,
      paddingHorizontal: theme.spaceS,
      marginVertical: theme.spaceS,
      width: '100%',
    },
    contrastText: {
      color: theme.textContrastColor,
      marginRight: theme.spaceXXS,
    },
    text: {
      color: theme.textColor,
      fontWeight: '700',
      fontSize: theme.fontM,
    },
    tournamentWrapper: {
      paddingHorizontal: theme.spaceS,
      paddingVertical: theme.spaceS,
      marginHorizontal: theme.spaceXS,
      flexShrink: 1,
    },
    hidden: {
      opacity: 0,
    },
    logo: {
      width: 2 * theme.spaceXXL,
      height: 2 * theme.spaceXXL,
      marginBottom: theme.spaceMS,
    },
    scoreWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    score: {
      fontWeight: '700',
      fontSize: theme.fontM,
      color: theme.neutralColor900,
    },
    hyphen: {
      color: theme.neutralColor500,
      marginHorizontal: theme.spaceS,
    },
    teamWrapper: {
      alignItems: 'center',
      flex: 1,
      paddingHorizontal: theme.spaceXS,
    },
    teamName: {
      color: theme.neutralColor900,
      fontSize: theme.fontL,
      fontWeight: '700',
    },
    matchTime: {
      color: theme.semanticSuccessColor500,
    },
    time: {
      color: theme.neutralColor800,
      fontWeight: '600',
    },
    bookView: {
      width: '100%',
      paddingHorizontal: theme.spaceML,
    },
  });
};
