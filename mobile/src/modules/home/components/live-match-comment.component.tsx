import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { MatchContext } from '../context/live-match.context';
import { Comment } from '../interface/comment.interface';
import { useTheme } from '../../../hook/theme.hook';
import { CommentComponent } from './comment.component';
import { AppTheme } from '../../../theme/theme';
import { Icon } from '../../../components/icon/icon.component';
import { useTranslation } from '../../../hook/translate.hook';
import { useAppSelector } from '../../../store/store';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { screens } from '../../../navigations/const/screens.const';

export const LiveMatchComment = () => {
  const { matchId } = useContext(MatchContext);
  const [matchDocId, setMatchDocId] = useState<string>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState('');
  const name = useAppSelector((state) => state.user.user)?.name;
  const [isOpen, setOpen] = useState(false);

  const theme = useTheme();
  const styles = initStyles(theme);
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation();

  const initMatchComment = async () => {
    firestore()
      .collection('matchs')
      .where('matchId', '==', matchId)
      .get()
      .then((matchs) => {
        if (!matchs.size) {
          firestore()
            .collection('matchs')
            .add({
              matchId: matchId,
            })
            .then((data) => {
              setMatchDocId(data.id);
            });
        } else {
          setMatchDocId(matchs.docs[0].id);
        }
      });
  };

  useEffect(() => {
    initMatchComment();
  }, []);

  useEffect(() => {
    if (!matchDocId) return;

    const subscriber = firestore()
      .collection('matchs')
      .doc(matchDocId)
      .collection('comments')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapShot) => {
        setComments((snapShot.docs.map((doc) => doc.data()) ?? []) as unknown as Comment[]);
      });

    return () => subscriber();
  }, [matchDocId]);

  const renderItem = useCallback(({ item }: { item: Comment }) => {
    return <CommentComponent comment={item} />;
  }, []);

  const sendComment = async () => {
    if (!content || !content.length) return;

    Keyboard.dismiss();
    const payload = {
      sender: name,
      timestamp: new Date().getTime(),
      content: content,
    };

    setContent('');
    firestore()
      .collection('matchs')
      .doc(matchDocId)
      .collection('comments')
      .add(payload)
      .then((data) => {
        console.log(data.id);
      });
  };

  const onCommentNotUser = () => {
    setOpen(true);
  };

  const goToLogin = () => {
    navigation.navigate(screens.login.name);
  };

  const goToRegister = () => {
    navigation.navigate(screens.register.name);
  };

  return (
    <View style={styles.flatList}>
      <FlatList
        style={styles.flatList}
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item) => item.timestamp + item.sender}
      />
      <TouchableOpacity disabled={!!name} style={styles.inputWrapper} onPress={onCommentNotUser}>
        <View style={styles.inputInnerWrapper}>
          <TextInput
            value={content}
            style={styles.input}
            placeholder={t('match.comment_placeholder')}
            onChangeText={(text) => setContent(text)}
            multiline
            numberOfLines={2}
            editable={!!name}
          />
        </View>
        <TouchableOpacity disabled={!!!name} style={styles.sendWrapper} onPress={sendComment}>
          <Icon name="send" disable />
        </TouchableOpacity>
      </TouchableOpacity>
      {isOpen ? (
        <BottomSheet snapPoints={['60%']} enablePanDownToClose onClose={() => setOpen(false)}>
          <Text style={styles.header}>{t('match.login_to_comment')}</Text>
          <TouchableOpacity onPress={goToLogin} style={[styles.login]}>
            <Text style={styles.loginText}>{t('account.login')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToRegister} style={[styles.signup]}>
            <Text style={styles.signUpText}>{t('account.register')}</Text>
          </TouchableOpacity>
        </BottomSheet>
      ) : (
        <></>
      )}
    </View>
  );
};

const initStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    flatList: {
      flex: 1,
      backgroundColor: theme.secondaryColor50,
    },
    inputWrapper: {
      borderTopColor: theme.neutralColor200,
      borderTopWidth: 1,
      padding: theme.spaceS,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      paddingVertical: 0,
    },
    inputInnerWrapper: {
      flex: 1,
      borderRadius: theme.radiusS,
      borderColor: theme.primaryColor,
      flexDirection: 'row',
      borderWidth: 1,
      paddingHorizontal: theme.spaceS,
      marginRight: theme.spaceS,
      paddingVertical: 0,
    },
    sendWrapper: {
      backgroundColor: theme.neutralColor300,
      borderRadius: theme.radiusCircle,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spaceMS,
    },
    header: {
      color: theme.neutralColor600,
      width: '100%',
      textAlign: 'center',
      fontWeight: '700',
      marginTop: theme.spaceML,
    },
    login: {
      marginHorizontal: theme.spaceLL,
      marginTop: theme.spaceML,
      borderRadius: theme.radiusS,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.primaryColor,
      paddingVertical: theme.spaceMS,
    },
    loginText: {
      fontWeight: '500',
      color: theme.textContrastColor,
      fontSize: theme.fontM,
    },
    signup: {
      marginHorizontal: theme.spaceLL,
      marginTop: theme.spaceML,
      borderRadius: theme.radiusS,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: theme.neutralColor400,
      borderWidth: 2,
      paddingVertical: theme.spaceMS,
    },
    signUpText: {
      fontWeight: '500',
      color: theme.textColor,
      fontSize: theme.fontM,
    },
  });
};
