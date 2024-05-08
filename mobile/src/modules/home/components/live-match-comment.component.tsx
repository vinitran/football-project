import { View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useContext, useEffect } from 'react';
import { MatchContext } from '../context/live-match.context';

export const LiveMatchComment = () => {
  const { matchId } = useContext(MatchContext);

  const initMatchComment = async () => {
    const matches = await firestore()
      .collection('matchs')
      .where('matchId', '==', matchId)
      .get()
      .then((matchs) => {
        if (!matchs.size) {
          firestore().collection('matchs').add({
            matchId: matchId,
          });
        }
      });
  };

  useEffect(() => {
    initMatchComment();
  }, []);

  return <View></View>;
};
