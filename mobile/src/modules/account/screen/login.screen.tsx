import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../hook/theme.hook';
import { AppTheme } from '../../../theme/theme';
import { useTranslation } from '../../../hook/translate.hook';
import { useState } from 'react';
import { Icon } from '../../../components/icon/icon.component';
import { Button } from '../../../components/button/button.component';

export const LoginScreen = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = initStyles(theme);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');
  const [secure, setSecure] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onChangeUsername = (username: string) => {
    setError1('');
    setUsername(username);
  };

  const onChangePassword = (password: string) => {
    setError2('');
    setPassword(password);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.wrapper}>
        <Text style={styles.label}>{t('account.username')}</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            onChangeText={onChangeUsername}
            placeholder={t('account.username_placeholder')}
            placeholderTextColor={theme.neutralColor400}
            style={styles.input}
          />
        </View>
        <View style={styles.errorWrapper}>
          <Text style={styles.error}>{error2}</Text>
        </View>
        <Text style={styles.label}>{t('account.password')}</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            onChangeText={onChangePassword}
            placeholder={t('account.password_placeholder')}
            placeholderTextColor={theme.neutralColor400}
            style={styles.input}
            secureTextEntry={secure}
          />
          {!!password.length && (
            <TouchableOpacity activeOpacity={1} onPress={() => setSecure(!secure)}>
              <Icon style={styles.iconRight} name={secure ? 'eye' : 'eye-slash'} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.errorWrapper}>
          <Text style={styles.error}>{error2}</Text>
        </View>
        <View style={{ opacity: isLoading ? 0.8 : 1, paddingHorizontal: theme.spaceS }}>
          <Button disable={isLoading} label={t('account.login')} onPress={() => {}} />
        </View>
        <Text style={styles.textWrapper}>
          <Text style={styles.label}>{t('account.no_account')}</Text>
          <Text style={styles.link}>{t('account.register')}</Text>
        </Text>
      </View>
    </View>
  );
};

export const initStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    wrapper: {
      backgroundColor: theme.backgroundColor,
      borderRadius: theme.radiusS,
      padding: theme.spaceS,
    },
    errorWrapper: {
      height: theme.spaceXL,
      justifyContent: 'center',
      paddingHorizontal: theme.spaceS,
    },
    error: {
      fontSize: theme.fontS,
      color: theme.errorColor,
    },
    screen: {
      flex: 1,
      paddingHorizontal: theme.spaceLL,
      justifyContent: 'center',
    },
    inputWrapper: {
      marginHorizontal: theme.spaceS,
      borderRadius: theme.radiusS,
      borderColor: theme.primaryColor,
      borderWidth: 1,
      paddingHorizontal: theme.spaceS,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
    },
    iconRight: {
      marginHorizontal: theme.spaceS,
    },
    label: {
      fontSize: theme.fontS,
      color: theme.neutralColor600,
      marginLeft: theme.spaceS,
      marginBottom: theme.spaceXS,
    },
    link: {
      fontSize: theme.fontS,
      color: theme.secondaryColor200,
      fontWeight: '500',
    },
    textWrapper: {
      marginHorizontal: theme.spaceS,
      marginVertical: theme.spaceS,
    },
  });
};
