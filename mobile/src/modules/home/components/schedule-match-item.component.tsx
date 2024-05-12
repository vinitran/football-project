import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../hook/theme.hook';
import { Match } from '../../../interface/match.interface';
import { AppTheme } from '../../../theme/theme';

export const ScheduleMatchItem = ({
  match,
  onPress,
}: {
  match: Match;
  onPress: (match: Match) => void;
}) => {
  const theme = useTheme();
  const styles = initStyles(theme);
  const time = new Date(match.timestamp);

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.wrapper} onPress={() => onPress(match)}>
      <View style={styles.aroundRow}>
        <View style={styles.teamWrapper}>
          <Image source={{ uri: match.home.logo }} style={styles.logo} resizeMode="cover" />
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.teamName}>
            {match.home.name}
          </Text>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>{`${match.date.substring(6, 8)}/${match.date.substring(
            4,
            6
          )}/${match.date.substring(0, 4)}`}</Text>
          <Text>
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
    </TouchableOpacity>
  );
};

const initStyles = (theme: AppTheme) => {
  return StyleSheet.create({
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
      backgroundColor: theme.backgroundColor,
      paddingBottom: theme.spaceMS,
      paddingHorizontal: theme.spaceS,
      width: '100%',
      borderBottomColor: theme.neutralColor100,
      borderTopColor: theme.neutralColor100,
      borderBottomWidth: 1,
      borderTopWidth: 1,
    },
    contrastText: {
      color: theme.textContrastColor,
      marginRight: theme.spaceXXS,
    },
    text: {},
    tournamentWrapper: {
      borderBottomLeftRadius: theme.radiusS,
      borderBottomRightRadius: theme.radiusS,
      backgroundColor: theme.neutralColor200,
      paddingHorizontal: theme.spaceS,
      paddingVertical: theme.spaceS,
      marginHorizontal: theme.spaceXS,
      flexShrink: 1,
    },
    hidden: {
      opacity: 0,
    },
    logo: {
      width: theme.spaceXXL,
      height: theme.spaceXXL,
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
      fontSize: theme.fontM,
    },
    matchTime: {
      color: theme.semanticSuccessColor500,
    },
  });
};
