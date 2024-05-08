import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../hook/theme.hook';
import { AppTheme } from '../../../theme/theme';
import { useTranslation } from '../../../hook/translate.hook';
import { Icon } from '../../../components/icon/icon.component';
import { useService } from '../../../hook/service.hook';
import { AppLanguageType } from '../../../services/translate.service';

export const LanguageSetting = (toggleModalVisible: () => void) => {
  const theme = useTheme();
  const styles = initStyles(theme);
  const { t } = useTranslation();

  const { translateService, storageService } = useService();

  const language = [
    {
      value: 'vi',
      label: t('language.vi'),
    },
    {
      value: 'en',
      label: t('language.en'),
    },
  ];

  const onPressLang = (value: string) => {
    translateService.changeLanguage(value as AppLanguageType);
    storageService.saveAppLanguageType(value as AppLanguageType);
    toggleModalVisible();
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{t('account.choose_language')}</Text>
      {language.map((lang) => (
        <TouchableOpacity style={styles.item} onPress={() => onPressLang(lang.value)}>
          <View style={styles.leftside}>
            <Icon name={lang.value} style={styles.flagIcon} />
            <Text style={styles.text}>{lang.label}</Text>
          </View>
          {translateService.currentLanguage == lang.value ? <Icon name="check" /> : <></>}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const initStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    wrapper: {
      width: '70%',
      paddingVertical: theme.spaceMS,
      paddingHorizontal: theme.spaceM,
      borderRadius: theme.radiusS,
      backgroundColor: theme.backgroundColor,
    },
    leftside: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      color: theme.neutralColor500,
      marginLeft: theme.spaceMS,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: theme.spaceMS,
    },
    flagIcon: {
      width: theme.spaceLL,
      height: theme.spaceLL,
    },
    title: {
      fontSize: theme.fontL,
      fontWeight: '700',
      color: theme.neutralColor900,
      alignSelf: 'center',
      width: '100%',
      textAlign: 'center',
      marginBottom: theme.spaceMS,
    },
  });
};
