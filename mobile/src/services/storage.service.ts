import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppLanguageType } from './translate.service';

const APP_LANGUAGE = 'APP_LANGUAGE';

export class StorageService {
  async saveAppLanguageType(language: AppLanguageType): Promise<boolean> {
    try {
      await AsyncStorage.setItem(APP_LANGUAGE, language);
      return true;
    } catch (e) {
      return false;
    }
  }

  async getAppLanguageType(): Promise<AppLanguageType | null> {
    try {
      return (await AsyncStorage.getItem(APP_LANGUAGE)) as AppLanguageType;
    } catch (e) {
      return null;
    }
  }
}
