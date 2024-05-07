import React from 'react';
import { useTheme } from '../../../hook/theme.hook';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AppTheme } from '../../../theme/theme';
import { AccountItem } from '../components/account-item.component';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useTranslation } from '../../../hook/translate.hook';
import { useNavigation } from '@react-navigation/native';
import { accountScreens } from '../const/route.const';

export const AccountScreen = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = initStyles(theme);

  const { navigate } = useNavigation();

  const goToLogin = () => {
    navigate(accountScreens.login.name);
  };

  const actions = [
    {
      name: 'logout',
      icon: 'logout',
      label: 'Đăng xuất',
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.signinWrapper}>
        <Image source={require('../../../assets/images/user-photo.png')} style={styles.avatar} />
        <Text style={styles.login} onPress={goToLogin}>
          {t('account.login')}
        </Text>
      </View>
    </View>
  );
};

const initStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    avatarWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    action: {
      marginTop: theme.spaceML,
    },
    avatar: {
      width: 1.5 * theme.spaceXXL,
      aspectRatio: 1,
      height: undefined,
      borderRadius: theme.radiusCircle,
    },
    signinWrapper: {
      alignItems: 'center',
      paddingHorizontal: theme.spaceML,
      flexDirection: 'row',
      marginTop: theme.spaceL,
    },
    login: {
      fontSize: theme.fontM,
      marginLeft: theme.spaceS,
      fontWeight: '600',
      color: theme.neutralColor700,
      paddingVertical: theme.spaceS,
    },
  });
};
