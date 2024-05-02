import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { News } from '../../../interface/news.interface';
import { useTheme } from '../../../hook/theme.hook';
import { AppTheme } from '../../../theme/theme';

interface NewsItemProps {
  news: News;
  onPress: (id: string) => void;
}

export const NewsHighlightItem = ({ news, onPress }: NewsItemProps) => {
  const theme = useTheme();
  const styles = initStyles(theme);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(news.id)} style={styles.container}>
      <Image source={{ uri: news.feature_image }} style={styles.image} resizeMode="cover" />
      <Text style={styles.text}>{news.name}</Text>
    </TouchableOpacity>
  );
};

const initStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    container: {
      height: theme.fullWidth * 0.7,
      backgroundColor: theme.secondaryColor50,
      borderRadius: theme.radiusS,
      marginHorizontal: theme.spaceS,
      marginVertical: theme.spaceXS,
      padding: theme.spaceS,
    },
    image: {
      width: '100%',
      height: undefined,
      borderRadius: 4,
      flex: 1,
    },
    text: {
      fontWeight: '600',
      textAlign: 'left',
      width: '100%',
      marginTop: theme.spaceS,
      color: theme.neutralColor800,
    },
  });
};
