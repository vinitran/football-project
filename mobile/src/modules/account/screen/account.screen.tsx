import React, { useMemo } from 'react';
import { useTheme } from '../../../hook/theme.hook';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AppTheme } from '../../../theme/theme';
import { AccountItem } from '../components/account-item.component';
import { useTranslation } from '../../../hook/translate.hook';
import { useNavigation } from '@react-navigation/native';
import { accountScreens } from '../const/route.const';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useService } from '../../../hook/service.hook';
import { setUser } from '../../../store/user.slice';
import { getAvatarFromId } from '../../../utils/app.helper';

export const AccountScreen = () => {
  const { storageService } = useService();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = initStyles(theme);

  const { navigate } = useNavigation();
  const { user } = useAppSelector((state) => state.user);

  const goToLogin = () => {
    navigate(accountScreens.login.name);
  };

  const onLogout = () => {
    dispatch(setUser(undefined));
    storageService.saveAcessToken('');
  };

  const actions = useMemo(() => {
    const actions = [
      {
        name: 'setting',
        icon: 'setting',
        label: t('account.setting'),
        onPress: () => navigate(accountScreens.setting.name),
      },
    ];

    if (!!user) {
      actions.push({
        name: 'logout',
        icon: 'logout',
        label: t('account.logout'),
        onPress: () => onLogout(),
      });
    }

    return actions;
  }, [user, t, onLogout]);

  return (
    <View style={styles.container}>
      <View style={styles.signinWrapper}>
        <Image
          source={
            user ? getAvatarFromId(user.username) : require('../../../assets/images/user-photo.png')
          }
          style={styles.avatar}
        />
        {user ? (
          <Text style={styles.login}>{user.name}</Text>
        ) : (
          <Text style={styles.login} onPress={goToLogin}>
            {t('account.login')}
          </Text>
        )}
      </View>
      <View style={styles.actionWrapper}>
        {actions.map((action) => (
          <AccountItem
            key={action.name}
            label={action.label}
            icon={action.icon}
            onPress={action.onPress}
          />
        ))}
      </View>
    </View>
  );
};

const initStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.secondaryColor50,
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
      backgroundColor: theme.neutralColor200,
    },
    signinWrapper: {
      alignItems: 'center',
      paddingHorizontal: theme.spaceML,
      flexDirection: 'row',
      marginTop: theme.spaceXXL,
      backgroundColor: theme.backgroundColor,
      marginHorizontal: theme.spaceMS,
      paddingVertical: theme.spaceMS,
      borderRadius: theme.radiusS,
    },
    login: {
      fontSize: theme.fontM,
      marginLeft: theme.spaceS,
      fontWeight: '600',
      color: theme.neutralColor700,
      paddingVertical: theme.spaceM,
    },
    actionWrapper: {
      marginTop: theme.spaceXXL,
      backgroundColor: theme.backgroundColor,
      marginHorizontal: theme.spaceMS,
      paddingVertical: theme.spaceMS,
      borderRadius: theme.radiusS,
    },
  });
};
