import { useParams } from 'react-router-dom';
import VideoPlayer from '../../components/video-player';
import { _axios } from '../../configs/axiosconfiguartor';
import { apis } from '../../consts/api.const';
import { useEffect, useState } from 'react';
import { Loading } from '../../components/commons/loading';
import { localStorageKey } from '../../consts/local-storage-key.const';
// import { database, ref, push, onValue } from './../../configs/firebase';
import { RandomBgColor, RandomColor } from '../../utils';
import moment from 'moment';
import { toast } from 'react-toastify';
import { db } from '../../configs/firebase';
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  DocumentData,
  doc,
  getDoc,
  setDoc,
  orderBy,
  onSnapshot,
  updateDoc
} from 'firebase/firestore';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';

interface Meta {
  name: string;
  cdn: string;
  url: string;
  role: string;
}

type Props = {};

export const LiveDetailPage = (props: Props) => {
  const params = useParams();
  const [meta, setMeta] = useState<Meta[]>([]);

  // API
  const fetchLiveMeta = () => {
    _axios
      .get(apis.live.meta(params.id))
      .then((res) => {
        if (res) {
          try {
            setMeta(res?.data?.data?.play_urls ?? []);
          } catch (error) {
            setMeta([]);
          }
        }
      })
      .catch(() => {});
  };

  // EFFECT
  useEffect(() => {
    fetchLiveMeta();
  }, []);

  return (
    <>
      <div className="live-detail-page p-[30px] live-detail">
        {!!meta.length ? (
          <div className=" flex gap-[12px]">
            <LiveDetailContent meta={meta} />
            {params.id ? <ChatBox liveId={params.id} /> : <></>}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
};

const filterUrl2 = (url?: string) => {
  const updatedUrl = url ? url.replace(/playlist\.m3u8|index\.m3u8/g, 'chunklist.m3u8') : '';
  return `https://stream.vinitran1245612.workers.dev?apiurl=${updatedUrl}&is_m3u8=true`;
};

const LiveDetailContent = ({ meta }: { meta: Meta[] }) => {
  const [liveUrl, setLiveUrl] = useState('');
  const [serverName, setServerName] = useState('');
  const [serverKey, setServerKey] = useState('');

  // EFFECT
  useEffect(() => {
    if (!!meta.length) {
      setServerName(meta.slice(0, 1)[0].name);
      setServerKey(meta.slice(0, 1)[0].cdn);
      setLiveUrl(meta.slice(0, 1)[0].url);
    }
  }, []);

  return (
    <div className="flex-1 live-detail-item flex flex-col gap-[16px]">
      <h4 className="align-middle pl-4 border-l-4 border-green-500 border-solid leading-[28px] text-[20px] uppercase">
        <p>
          {`${localStorage.getItem(localStorageKey.liveTournamentName)} : ${localStorage.getItem(localStorageKey.liveHomeName)} VS ${localStorage.getItem(localStorageKey.liveAwayName)}`}
        </p>
      </h4>
      <VideoPlayer src={filterUrl2(liveUrl)} />
      {/* <VideoPlayer
        src={filterUrl2(
          'https://vb90xltcvg.nsnd.live/live/_definst_/stream_1_1bda7@daoSD/playlist.m3u8'
        )}
      /> */}
      <div className="flex items-end gap-[4px]">
        <p>Chọn máy chủ phát:</p>
        {meta.map((item) => {
          return (
            <>
              <button
                className={`w-[100px] h-[40px] py-[2px] rounded-[8px] text-white ${serverName === item.name && serverKey === item.cdn ? 'button-selected-server' : ' bg-[--color-three]'}`}
                onClick={() => {
                  setServerName(item.name);
                  setServerKey(item.cdn);
                  setLiveUrl(item.url);
                }}>
                {item.name}
              </button>
            </>
          );
        })}
      </div>
    </div>
  );
};

const ChatBox = ({ liveId }: { liveId: string }) => {
  // const [messages, setMessages] = useState<IMessageLive[]>([]);
  const [matchDocId, setMatchDocId] = useState<string>('8jO1Hm7cCK79vWAM7a33');
  const [inputMessage, setInputMessage] = useState<string | undefined>();
  const [comments, setComments] = useState<IComment[]>([]);
  const listenerQuery = query(collection(db, `matchs/${liveId}/comments`));
  const [listenerSnapshot] = useCollectionData(listenerQuery);
  const [commentsCollection] = useCollectionData(
    query(collection(db, `matchs/${matchDocId}/comments`), orderBy('timestamp', 'asc'))
  );

  const fetchComments = async () => {
    // Get match from collection matchs
    const matchsQuery = query(collection(db, 'matchs'), where('matchId', '==', liveId));
    getDocs(matchsQuery).then((matchsSnapshot) => {
      console.log('matchsSnapshot:', matchsSnapshot);

      // const commentsArray: any[] = [];
      if (matchsSnapshot && !matchsSnapshot.empty) {
        // toast.success('old doc');
        // // Get matchId and list comments of match Id
        // for (const matchDoc of matchsSnapshot.docs) {
        //   const commentsQuery = query(
        //     collection(db, `matchs/${matchDoc.id}/comments`),
        //     orderBy('timestamp', 'asc')
        //   );
        //   const commentsSnapshot = await getDocs(commentsQuery);

        //   commentsSnapshot.forEach((commentDoc) => {
        //     commentsArray.push(commentDoc.data());
        //   });
        // }
        setMatchDocId(matchsSnapshot.docs[0].id);
      } else {
        // Create the live if it does not exist
        addDoc(collection(db, 'matchs'), { matchId: liveId }).then().catch();

        // getDocs(query(collection(db, 'matchs'), where('matchId', '==', liveId))).then((docs) => {
        //   docs.forEach((doc) => {
        //     console.log('new doc: ', doc.id, ' - ', doc.data());
        //   });
        // });
        // const liveDocRef = doc(db, 'matchs', liveId);
        // const liveDoc = await getDoc(liveDocRef);

        // if (!liveDoc.exists()) {
        //   setDoc(liveDocRef, { matchId: liveId }).then().catch();
        // }
      }
      // setComments(commentsArray);
    });
  };

  useEffect(() => {
    // onValue(ref(database, 'football-chat'), (data) => {
    //   let getMsg: IMessageLive[] = [];
    //   data.forEach((d) => {
    //     getMsg.push(d.val());
    //   });
    //   setMessages(getMsg);
    // });
    fetchComments();
  }, [listenerSnapshot]);
  useEffect(() => {
    console.log('matchDocId: ', matchDocId);
  }, [matchDocId]);

  const handleSendMessage = async () => {
    if (localStorage.getItem(localStorageKey.userInfo)) {
      // push(ref(database, 'football-chat'), {
      //   liveId: liveId,
      //   name: JSON.parse(localStorage.getItem(localStorageKey.userInfo) ?? '')?.name,
      //   chat: inputMessage,
      //   timestamp: moment().format()
      // });
      addDoc(collection(db, `matchs/${matchDocId}/comments`), {
        sender: JSON.parse(localStorage.getItem(localStorageKey.userInfo) ?? '')?.name,
        content: inputMessage,
        timestamp: new Date().getTime()
      })
        .then(() => {})
        .catch(() => {});
      setInputMessage('');
    } else {
      toast.warning('Bạn cần đăng nhập để bình luận');
    }
  };
  return (
    <>
      {matchDocId}
      <div className="chat-bo mt-[44px] flex flex-col items-start justify-start gap-[12px] w-[400px] h-[496px]">
        <div className="flex-1 flex flex-col items-start justify-start w-full p-[12px] border-solid border-[2px] gap-[12px] border-[--color-three] rounded-[8px] overflow-x-hidden overflow-y-auto">
          {commentsCollection?.map((comment) => (
            // liveId === message.liveId && (
            //   <ChatItem
            //     liveId={message.liveId}
            //     name={message.name}
            //     chat={message.chat}
            //     timestamp={message.timestamp}
            //   />
            // )
            <ChatItem name={comment.sender} chat={comment.content} timestamp={comment.timestamp} />
          ))}
        </div>

        <div className="flex w-full gap-[8px]">
          <input
            className="flex-1 outline-none border-solid border-[1px] border-[--color-three] p-[8px] rounded-[8px] h-[40px]"
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button
            className={`w-[100px] h-[40px] rounded-[8px] text-white bg-[--color-three] flex items-center justify-center`}
            onClick={handleSendMessage}>
            Gửi
          </button>
        </div>
      </div>
    </>
  );
};

const ChatItem = ({ name, chat, timestamp }: IMessageLive) => {
  const [isUser, setIsUser] = useState<boolean>(false);
  useEffect(() => {
    setIsUser(
      name === JSON.parse(localStorage.getItem(localStorageKey.userInfo) ?? '{"name":""}')?.name
    );
  }, [localStorage.getItem(localStorageKey.userInfo)]);
  return (
    <>
      <div
        className={`flex gap-[4px] w-full ${isUser ? 'flex-row-reverse items-start justify-start' : 'flex-row'}`}>
        {/* NAME */}
        <div
          className={`flex items-center justify-center text-bold h-[32px] w-[32px] rounded-[8px] bg-[--color-three] text-white`}>
          <p>{name && name.length > 0 ? name.slice(0, 1).toUpperCase() : ''}</p>
        </div>
        {/* CHAT */}
        <div className={`flex flex-col w-fit  ${isUser ? 'items-end' : ''}`}>
          <p className="px-[8px] py-[4px] rounded-md bg-blue-400 text-white w-fit min-h-[32px] break-all">
            {chat}
          </p>
          <div className={`italic text-[12px] text-gray-600 w-fit`}>
            {moment(timestamp).format('HH:mm')}
          </div>
        </div>
      </div>
    </>
  );
};

interface IMessageLive {
  name: string;
  chat: string;
  timestamp?: string;
}

interface IComment {
  sender: string;
  content: string;
  timestamp: string;
}
