import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { News } from '../../../interface/news.interface';
import { useTheme } from '../../../hook/theme.hook';
import { AppTheme } from '../../../theme/theme';
import React from 'react';

interface NewsItemProps {
  news: News;
  onPress: (id: string) => void;
}

export const NewsItem = React.memo(({ news, onPress }: NewsItemProps) => {
  const theme = useTheme();
  const styles = initStyles(theme);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(news.id)} style={styles.container}>
      <Image source={{ uri: news.feature_image }} style={styles.image} resizeMode="cover" />
      <Text style={styles.text}>{news.name}</Text>
    </TouchableOpacity>
  );
});

const initStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.secondaryColor50,
      borderRadius: theme.radiusS,
      marginHorizontal: theme.spaceS,
      marginVertical: theme.spaceXS,
      padding: theme.spaceS,
    },
    image: {
      width: (theme.fullWidth - 64) / 2,
      height: undefined,
      aspectRatio: 1,
      borderRadius: 4,
    },
    text: {
      fontWeight: '600',
      textAlign: 'left',
      width: (theme.fullWidth - 64) / 2,
      marginTop: theme.spaceS,
      color: theme.neutralColor800,
    },
  });
};
