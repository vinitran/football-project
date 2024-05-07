import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { News } from '../../../interface/news.interface';
import { useTheme } from '../../../hook/theme.hook';
import { AppTheme } from '../../../theme/theme';
import { Icon } from '../../../components/icon/icon.component';
import { removeCommentorName } from '../../../utils/string.helper';

interface NewsItemProps {
  news: News;
  onPress: (id: string) => void;
}

export const MatchReviewHighlightItem = ({ news, onPress }: NewsItemProps) => {
  const theme = useTheme();
  const styles = initStyles(theme);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(news.id)} style={styles.container}>
      <View style={styles.image}>
        <ImageBackground
          source={{ uri: news.feature_image }}
          style={styles.image}
          resizeMode="cover"
        >
          <Icon name="play" style={styles.icon} />
        </ImageBackground>
      </View>
      <Text style={styles.text}>{removeCommentorName(news.name)}</Text>
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
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontWeight: '600',
      textAlign: 'left',
      width: '100%',
      marginTop: theme.spaceS,
      color: theme.neutralColor800,
    },
    icon: {
      width: theme.spaceXXL,
      height: theme.spaceXXL,
    },
  });
};
