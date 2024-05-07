import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppLanguageType } from './translate.service';

const APP_LANGUAGE = 'APP_LANGUAGE';
const ACCESS_TOKEN = 'ACCESS_TOKEN';

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

  async saveAcessToken(accessToken: string): Promise<boolean> {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      return true;
    } catch (e) {
      return false;
    }
  }

  async getAccessToken(): Promise<string | null> {
    try {
      return (await AsyncStorage.getItem(ACCESS_TOKEN)) as String;
    } catch (e) {
      return null;
    }
  }
}
