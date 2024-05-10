import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../hook/theme.hook';
import { Comment } from '../interface/comment.interface';
import { useAppSelector } from '../../../store/store';
import { AppTheme } from '../../../theme/theme';
import { formatTime, getAvatarFromId } from '../../../utils/app.helper';

interface CommentProp {
  comment: Comment;
}

export const CommentComponent = ({ comment }: CommentProp) => {
  const name = useAppSelector((state) => state.user.user)?.name;
  const theme = useTheme();
  const styles = initStyles(theme, comment.sender === name);

  return (
    <View style={styles.commentSend}>
      <Image source={getAvatarFromId(comment.sender)} style={styles.avatar} />
      <View>
        <Text style={styles.sender}>
          {comment.sender + ` (${formatTime(new Date(comment.timestamp))})`}
        </Text>
        <Text style={styles.text}>{comment.content}</Text>
      </View>
    </View>
  );
};

const initStyles = (theme: AppTheme, isSender: boolean) => {
  return StyleSheet.create({
    commentSend: {
      flexDirection: isSender ? 'row-reverse' : 'row',
      maxWidth: isSender ? '100%' : '70%',
      marginVertical: theme.spaceS,
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      paddingRight: isSender ? '30%' : 0,
    },
    avatar: {
      width: theme.spaceLL,
      height: theme.spaceLL,
      borderRadius: theme.radiusCircle,
      marginHorizontal: theme.spaceMS,
      backgroundColor: theme.neutralColor200,
    },
    text: {
      backgroundColor: isSender ? theme.secondaryColor600 : theme.neutralColor200,
      padding: theme.spaceMS,
      borderRadius: theme.spaceS,
      color: isSender ? theme.textContrastColor : theme.textColor,
    },
    sender: {
      fontSize: theme.fontS,
      color: theme.neutralColor600,
      marginBottom: theme.spaceXS,
    },
  });
};
