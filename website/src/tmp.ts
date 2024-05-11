// const [matchDocId, setMatchDocId] = useState<string>();
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [content, setContent] = useState('');
//   const name = useAppSelector((state) => state.user.user)?.name;
//   const [isOpen, setOpen] = useState(false);

//   const theme = useTheme();
//   const styles = initStyles(theme);
//   const { t } = useTranslation();
//   const bottomSheetRef = useRef<BottomSheet>(null);
//   const navigation = useNavigation();

//   const initMatchComment = async () => {
//     firestore()
//       .collection('matchs')
//       .where('matchId', '==', matchId)
//       .get()
//       .then((matchs) => {
//         if (!matchs.size) {
//           firestore()
//             .collection('matchs')
//             .add({
//               matchId: matchId,
//             })
//             .then((data) => {
//               setMatchDocId(data.id);
//             });
//         } else {
//           setMatchDocId(matchs.docs[0].id);
//         }
//       });
//   };

//   useEffect(() => {
//     initMatchComment();
//   }, []);

//   useEffect(() => {
//     if (!matchDocId) return;

//     const subscriber = firestore()
//       .collection('matchs')
//       .doc(matchDocId)
//       .collection('comments')
//       .orderBy('timestamp', 'asc')
//       .onSnapshot((snapShot) => {
//         setComments((snapShot.docs.map((doc) => doc.data()) ?? []) as unknown as Comment[]);
//       });

//     return () => subscriber();
//   }, [matchDocId]);

//   const renderItem = useCallback(({ item }: { item: Comment }) => {
//     return <CommentComponent comment={item} />;
//   }, []);

//   const sendComment = async () => {
//     if (!content || !content.length) return;

//     Keyboard.dismiss();
//     const payload = {
//       sender: name,
//       timestamp: new Date().getTime(),
//       content: content,
//     };

//     setContent('');
//     firestore()
//       .collection('matchs')
//       .doc(matchDocId)
//       .collection('comments')
//       .add(payload)
//       .then((data) => {
//         console.log(data.id);
//       });
//   };