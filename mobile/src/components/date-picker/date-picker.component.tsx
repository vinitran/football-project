import React, { useEffect, useMemo, useState } from 'react';
import { Text, View, TouchableOpacity, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import dayjs, { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hook/theme.hook';
import { Icon } from '../icon/icon.component';
import { AppTheme } from '../../theme/theme';

export enum CalendarHeaderType {
  DATE,
  WEEK,
  MONTH,
  YEAR,
}

interface CustomStyle {
  containerCalendar?: ViewStyle;
  calendar?: ViewStyle;
  buttonContainer?: ViewStyle;
  markedDatesContainer?: ViewStyle;
  markedDatesText?: TextStyle;
  container?: ViewStyle;
  button?: ViewStyle;
  dateContent?: ViewStyle;
  buttonText?: TextStyle;
  arrowContainer?: ViewStyle;
}

export interface DayInCalender {
  day: number;
  year: number;
  month?: number;
  dateString: string; // YYYY-MM-DD
}

interface Props {
  defaultDate?: string;
  hideArrows?: boolean;
  hideExtraDays?: boolean;
  enableSwipeMonths?: boolean;
  dateFormat?: string;
  monthFormat?: string;
  shortDateFormat?: string;
  style?: CustomStyle;
  themeCalendar?: any;
  onMonthChange?: (date: DateData) => void;
  headerType?: CalendarHeaderType;
  onDateChange: (day: string) => void;
  onDayLongPress?: (day: string) => void;
  canOpenCalendar?: boolean;
  hideCalendarButton?: boolean;
  hideWeekHeaderPrefix?: boolean;
  startLimitDate: Dayjs;
  endLimitDate: Dayjs;
}

export const DateHeaderFormat = 'YYYY-MM-DD';
export const OutputFormat = 'YYYYMMDD';

export const DatePicker = React.memo(
  ({
    defaultDate,
    dateFormat = 'DD/MM/YYYY',
    shortDateFormat = 'DD/MM',
    headerType = CalendarHeaderType.DATE,
    onDateChange,
    startLimitDate,
    endLimitDate,
  }: Props) => {
    const [selected, setSelected] = useState(defaultDate || dayjs().format(DateHeaderFormat));

    const theme = useTheme();
    const styles = initStyles(theme);

    useEffect(() => {
      onDateChange(dayjs(selected).format(OutputFormat));
    }, [selected]);

    const goToPrevious = (): void => {
      setSelected(dayjs(selected).subtract(1, 'day').format(DateHeaderFormat));
    };

    const goToNext = (): void => {
      setSelected(dayjs(selected).add(1, 'day').format(DateHeaderFormat));
    };

    // Week

    // Month

    // Date
    const formatDateHeader = useMemo(() => {
      const date = dayjs(selected);
      const currentDate = dayjs();
      if (date.isSame(currentDate, 'date')) {
        return date.format(shortDateFormat);
      }
      if (date.isSame(currentDate, 'year')) {
        return date.format(shortDateFormat);
      }
      return date.format(dateFormat);
    }, [selected]);

    const selectHeaderType = () => {
      switch (headerType) {
        case CalendarHeaderType.DATE:
          return formatDateHeader;
      }
    };

    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={goToPrevious} style={styles.arrowContainer}>
          {startLimitDate.isSameOrBefore(selected) ? (
            <Icon style={styles.iconArrow} name="chervon-left" disable />
          ) : (
            <View style={styles.iconArrow} />
          )}
        </TouchableOpacity>
        <View style={styles.dateContent}>
          <Text style={styles.buttonText}>{selectHeaderType()}</Text>
        </View>
        <TouchableOpacity onPress={goToNext} style={styles.arrowContainer}>
          {endLimitDate.isSameOrAfter(selected) ? (
            <Icon style={styles.iconArrow} name="chervon-right-blue" disable />
          ) : (
            <View style={styles.iconArrow} />
          )}
        </TouchableOpacity>
      </View>
    );
  }
);

const initStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    buttonContainer: {
      height: 40,
      borderTopWidth: 1,
      alignItems: 'center',
      borderBottomWidth: 1,
      justifyContent: 'space-between',
      borderTopColor: theme.secondaryColor50,
      borderBottomColor: theme.secondaryColor50,
      backgroundColor: theme.backgroundColor,
      width: '100%',
      flexDirection: 'row',
    } as ViewStyle,
    button: {
      height: 30,
      minWidth: 188,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    } as ViewStyle,
    buttonCalendar: {
      top: 8,
      right: 10,
      marginRight: 3,
      position: 'absolute',
      paddingHorizontal: theme.spaceMS,
    } as ViewStyle,
    buttonText: {
      color: theme.textColor,
      fontSize: theme.fontS,
    },
    dateContent: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 25,
    } as ViewStyle,
    arrowContainer: {
      padding: theme.spaceS,
      marginHorizontal: theme.spaceMS,
    },
    iconArrow: {
      width: theme.iconS,
      height: theme.iconS,
    },
    defaultColor: {
      arrowColor: theme.textContrastColor,
      dayTextColor: theme.textContrastColor,
      monthTextColor: theme.textContrastColor,
      todayTextColor: theme.secondaryColor300,
      textSectionTitleColor: theme.textContrastColor,
      calendarBackground: theme.secondaryColor800,

      textDisabledColor: theme.neutralColor500,
      selectedDayTextColor: theme.primaryColor,
      selectedDayBackgroundColor: theme.backgroundColor,
    } as any,
  });
};
