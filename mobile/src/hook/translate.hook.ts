import { toStringOrEmpty } from '../utils/string.helper';
import { useTranslation as useBaseTranslation } from 'react-i18next';

export const useTranslation = () => {
  const { t: i18n } = useBaseTranslation();
  const t = (key?: string) => i18n(toStringOrEmpty(key));
  return { t };
};
