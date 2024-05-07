import i18n, { TOptionsBase } from 'i18next';
import viTranslation from '../assets/language/vi.json';
import enTranslation from '../assets/language/en.json';
import { initReactI18next } from 'react-i18next';

export type AppLanguageType = 'vi' | 'en';

const mergeLanguageResources = () => {
  return {
    vi: {
      translation: viTranslation,
    },
    en: {
      translation: enTranslation,
    },
  };
};

export class TranslateService {
  protected defaultLanguage: AppLanguageType = 'vi';
  public currentLanguage: AppLanguageType = this.defaultLanguage;

  constructor() {
    i18n.use(initReactI18next).init({
      fallbackLng: this.defaultLanguage,
      debug: false,
      resources: mergeLanguageResources(),
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
    });
  }

  getDefaultLanguage(): AppLanguageType {
    return this.defaultLanguage;
  }

  async changeLanguage(lang: AppLanguageType) {
    // setDayjsLocale(lang);
    i18n.changeLanguage(lang);
    // CalendarConfig.defaultLocale = lang;
    // container.service(HttpService).setHeaderLanguage(lang);
    this.currentLanguage = lang;
  }

  trans(keys: string | string[], options?: string | TOptionsBase | undefined) {
    return i18n.t(keys, options as any);
  }
}
