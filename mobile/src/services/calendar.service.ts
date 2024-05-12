import { Linking, PermissionsAndroid } from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import CalendarEvents from 'react-native-calendar-events';

export class CalendarService {
  addAndroidCalendarEvent = async (calendarEvent: AddCalendarEvent.CreateOptions) => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
        PermissionsAndroid.PERMISSIONS.READ_CALENDAR,
      ]);

      // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //   //showMessage(calendarPermitted);
      // } else {
      //   //showMessage(calendarNotPermitted);
      //   return; // Exit the function if permission is denied
      // }

      AddCalendarEvent.presentEventCreatingDialog(calendarEvent)
        .then((eventInfo) => {
          // handle success - receives an object with `calendarItemIdentifier` and `eventIdentifier` keys, both of type string.
          // On Android, where they are both equal and represent the event id, also strings.
          // when { action: 'CANCELED' } is returned, the dialog is dismissed
          console.log(JSON.stringify(eventInfo));
        })
        .catch((error: string) => {
          //showMessage(calendarFail);
        });
    } catch (error) {
      console.warn('Error adding event to calendar:', error);
    }
  };

  addToIosCalendar = async (title: string, startDate: any, endDate: any, url: string) => {
    // iOS: Requires # of seconds from January 1 2001 of the date you want to open calendar on
    try {
      const start = new Date(startDate);
      await CalendarEvents.requestPermissions(false);
      await CalendarEvents.checkPermissions(true);
      await CalendarEvents.saveEvent(title, {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        notes: title,
        url: url,
        alarms: [{ date: new Date(start.getTime() - 10 * 1000).toISOString() }],
      });
      //Linking.openURL(`calshow:${secondsSinceRefDateiOS}`);
    } catch (error) {
      // showMessage(calendarIosFail);
      return null;
    }
  };
}
