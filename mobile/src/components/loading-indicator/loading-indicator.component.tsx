import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from '../../hook/theme.hook';
import { AppTheme } from '../../theme/theme';

interface LoadingSpinnerInterface {
  isVisible: boolean;
}

export const LoadingSpinner = ({ isVisible }: LoadingSpinnerInterface) => {
  const theme = useTheme();
  const styles = initStyles(theme);

  return isVisible ? (
    <View style={styles.indicator}>
      <ActivityIndicator size={50} color={theme.primaryColor} />
    </View>
  ) : (
    <></>
  );
};

const initStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    indicator: {
      zIndex: 10,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      position: 'absolute',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
  });
};
