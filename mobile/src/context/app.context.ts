import { createContext } from 'react';
import { ApiService } from '../services/api.services';
import { CalendarService } from '../services/calendar.service';
import { StorageService } from '../services/storage.service';
import { TranslateService } from '../services/translate.service';

export interface IAppContext {
  services: {
    apiService: ApiService;
    calendarService: CalendarService;
    storageService: StorageService;
    translateService: TranslateService;
  };
}

export const AppContext = createContext<IAppContext>({
  services: {
    apiService: new ApiService(),
    calendarService: new CalendarService(),
    storageService: new StorageService(),
    translateService: new TranslateService(),
  },
});
