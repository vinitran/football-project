import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../hook/theme.hook';
import { AppTheme } from '../../../theme/theme';
import { useTranslation } from '../../../hook/translate.hook';
import { useState } from 'react';
import { Icon } from '../../../components/icon/icon.component';
import { Button } from '../../../components/button/button.component';
import { useService } from '../../../hook/service.hook';
import { register } from '../api/register.api';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export const RegisterScreen = () => {
  const { apiService: api } = useService();
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = initStyles(theme);
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');
  const [error3, setError3] = useState('');
  const [error4, setError4] = useState('');
  const [secure, setSecure] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const onChangeName = (name: string) => {
    setError1('');
    setName(name);
  };

  const onChangeEmail = (email: string) => {
    setError2('');
    setEmail(email);
  };

  const onChangeUsername = (username: string) => {
    setError3('');
    setUsername(username);
  };

  const onChangePassword = (password: string) => {
    setError4('');
    setPassword(password);
  };

  const onValidateName = () => {
    if (name.length === 0) {
      setError1(t('validation.no_name'));
      return false;
    }

    return true;
  };

  const onValidateEmail = () => {
    if (email.length === 0) {
      setError2(t('validation.no_email'));
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError2(t('validation.invalid_email'));
      return false;
    }
    return true;
  };

  const onValidateUsername = () => {
    if (username.length === 0) {
      setError3(t('validation.no_username'));
      return false;
    }

    return true;
  };

  const onValidatePasword = () => {
    if (password.length === 0) {
      setError4(t('validation.no_password'));
      return false;
    }

    if (password.length < 8) {
      setError2(t('validation.short_password'));
      return false;
    }

    return true;
  };

  const onValidate = () => {
    const isValidName = onValidateName();
    const isValidEmail = onValidateEmail();
    const isValidUsername = onValidateUsername();
    const isValidPassword = onValidatePasword();
    return isValidName && isValidEmail && isValidUsername && isValidPassword;
  };

  const onSubmit = () => {
    if (!onValidate()) return;

    Keyboard.dismiss();
    setLoading(true);
    register(api, {
      username: username.trim(),
      password: password.trim(),
      name: name.trim(),
      email: email.trim(),
    }).subscribe({
      next: (data) => {
        if (!data) return;

        Toast.show({
          type: 'success',
          text1: t('account.register_success'),
          text2: t('account.login_again'),
        });
        navigation.goBack();
      },
      complete: () => setLoading(false),
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.wrapper}>
        <Text style={styles.label}>{t('account.name')}</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            onChangeText={onChangeName}
            placeholder={t('account.name_placeholder')}
            placeholderTextColor={theme.neutralColor400}
            style={styles.input}
          />
        </View>
        <View style={styles.errorWrapper}>
          <Text style={styles.error}>{error1}</Text>
        </View>
        <Text style={styles.label}>{t('account.email')}</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            onChangeText={onChangeEmail}
            placeholder={t('account.email_placeholder')}
            placeholderTextColor={theme.neutralColor400}
            style={styles.input}
          />
        </View>
        <View style={styles.errorWrapper}>
          <Text style={styles.error}>{error2}</Text>
        </View>
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
          <Text style={styles.error}>{error3}</Text>
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
          <Text style={styles.error}>{error4}</Text>
        </View>
        <View style={{ opacity: isLoading ? 0.8 : 1, paddingHorizontal: theme.spaceS }}>
          <Button disable={isLoading} label={t('account.register')} onPress={onSubmit} />
        </View>
      </View>
    </View>
  );
};

const initStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    wrapper: {
      backgroundColor: theme.backgroundColor,
      borderRadius: theme.radiusS,
      padding: theme.spaceS,
    },
    errorWrapper: {
      height: theme.spaceLL,
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
