import { ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../hook/theme.hook';
import { AppTheme } from '../../../theme/theme';
import { Highlight } from '../../../interface/highlight.interface';
import { Icon } from '../../../components/icon/icon.component';

interface HightlightItemProps {
  news: Highlight;
  onPress: (id: string) => void;
}

export const HighlightItem = ({ news, onPress }: HightlightItemProps) => {
  const theme = useTheme();
  const styles = initStyles(theme);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(news.id)} style={styles.container}>
      <ImageBackground source={{ uri: news.feature_image }} style={styles.image} resizeMode="cover">
        <Icon name="play" style={styles.icon} />
      </ImageBackground>
      <Text style={styles.text}>{news.name}</Text>
    </TouchableOpacity>
  );
};

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
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontWeight: '600',
      textAlign: 'left',
      width: (theme.fullWidth - 64) / 2,
      marginTop: theme.spaceS,
      color: theme.neutralColor800,
    },
    icon: {
      width: theme.spaceXXL,
      height: theme.spaceXXL,
    },
  });
};
