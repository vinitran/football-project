import React from 'react';
import { AppContext, IAppContext } from '../context/app.context';
import { ApiService } from '../services/api.services';
import { CalendarService } from '../services/calendar.service';
import { StorageService } from '../services/storage.service';
import { TranslateService } from '../services/translate.service';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const contextValue: IAppContext = {
    services: {
      apiService: new ApiService(),
      calendarService: new CalendarService(),
      storageService: new StorageService(),
      translateService: new TranslateService(),
    },
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
