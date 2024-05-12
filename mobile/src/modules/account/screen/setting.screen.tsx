import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../../hook/theme.hook';
import { AppTheme } from '../../../theme/theme';
import { useTranslation } from '../../../hook/translate.hook';
import { SettingItem } from '../components/setting-item.component';
import { LanguageSetting } from '../components/language-setting.component';

export const SettingScreen = () => {
  const theme = useTheme();
  const styles = initStyles(theme);
  const { t } = useTranslation();

  const actions = [
    {
      name: 'language',
      label: t('account.language'),
    },
  ];

  return (
    <View style={styles.screen}>
      {actions.map((action) => (
        <SettingItem key={action.label} label={action.label} modalComponent={LanguageSetting} />
      ))}
    </View>
  );
};

const initStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
  });
};
