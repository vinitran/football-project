import { useNavigate, useParams } from 'react-router-dom';
import { useAxios } from '../../hooks/use-axios';
import { Loading } from '../../components/commons/loading';
import ReactPlayer from 'react-player';
import moment from 'moment';
import { apis } from '../../consts/api.const';
import { useEffect, useState } from 'react';
import { _axios, axiosConfiguration } from '../../configs/axiosconfiguartor';
import { HotBar } from '../../components/hot-bar';
import VideoPlayer from '../../components/video-player';
import { localStorageKey } from '../../consts/local-storage-key.const';
import { feedbackEnum } from '../../consts/feedback-type.const';

export const RewatchDetailPage = () => {
  const params = useParams();
  const [resDetailRewatch, setResDetailRewatch] = useState<any>();
  const [resHotRewatch, setResHotRewatch] = useState([]);
  const [resRecommentRewatch, setResRecommentRewatch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(localStorage.getItem(localStorageKey.token));
  const [isCanFeedbackReadAll, setIsCanFeedbackReadAll] = useState(false);

  // FUNCTION
  const fetchDetailNews = async () => {
    setLoading(true);
    _axios
      .get(apis.rewatch.detail({ id: params.id }))
      .then((res) => {
        if (res) {
          setResDetailRewatch(res.data?.data ?? []);
        }
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const fetchHotRewatch = async () => {
    _axios
      .get(apis.rewatch.hot())
      .then((res) => {
        if (res) {
          setResHotRewatch(res.data?.data ?? []);
        }
      })
      .catch(() => {});
  };
  const fetchRecommentRewatch = async () => {
    if (token) {
      axiosConfiguration.setAxiosToken(token, true);
      await _axios
        .get(apis.news.recomment())
        .then((res) => {
          if (res) {
            setResRecommentRewatch(res.data?.data ?? []);
          }
        })
        .catch(() => {});
    } else {
      setResRecommentRewatch([]);
    }
  };
  const fetchFeedback = (feedbackType: feedbackEnum) => {
    if (token) {
      console.log(`send feed back ${feedbackType} - ${params.id}`);
      axiosConfiguration.setAxiosToken(token, true);
      _axios.post(apis.feedback(), {
        FeedbackType: feedbackType,
        ItemId: params.id
      });
    }
  };

  // EFFECT
  useEffect(() => {
    fetchFeedback(feedbackEnum.READ);
  }, []);
  useEffect(() => {
    fetchDetailNews();
    fetchHotRewatch();
    fetchRecommentRewatch();
  }, [params]);
  useEffect(() => {
    fetchRecommentRewatch();
  }, [token]);
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = winScroll / height;

      if (scrolled >= 0.99 && !isCanFeedbackReadAll) {
        setIsCanFeedbackReadAll(true);
        fetchFeedback(feedbackEnum.READ_ALL);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isCanFeedbackReadAll]);

  // LISTENER
  window.addEventListener('onChangeAuthentication', () => {
    setToken(localStorage.getItem(localStorageKey.token));
  });

  return (
    <>
      <div className="news-detail flex justify-between p-5">
        {resDetailRewatch && !loading ? (
          <>
            <div className="main-left bg-[--color-background-content] mr-[24px]">
              <RewatchDetailContent rewatch={resDetailRewatch} />
            </div>
            <div className="flex flex-col w-[400px]">
              {!!resRecommentRewatch.length ? (
                <HotBar
                  title="Trận đấu đề xuất"
                  ids={resRecommentRewatch}
                  urlDetail={apis.rewatch.detail}
                  urlClick="/rewatch-detail/"
                />
              ) : (
                <div className="flex flex-col items-start justify-center w-full">
                  <div className="flex items-center mt-[12px] ml-4 mb-[18px] pl-4 border-l-4 border-green-500 border-solid uppercase">
                    <h4 className="leading-5 text-[20px]">Trận đấu đề xuất</h4>
                  </div>
                  <div className="flex justify-center w-full">
                    <p>Đăng nhập để xem trận đấu mà bạn có thể sẽ thích</p>
                  </div>
                </div>
              )}
              {!!resHotRewatch.length ? (
                <HotBar
                  title="Trận đấu nổi bật"
                  ids={resHotRewatch}
                  urlDetail={apis.rewatch.detail}
                  urlClick="/rewatch-detail/"
                />
              ) : (
                <div className="flex items-center justify-center">
                  <Loading />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
};

const RewatchDetailContent = ({ rewatch }: { rewatch: IRewatchDetail }) => {
  return (
    <>
      <div className="flex items-center justify-between ml-4 pl-4 border-l-4 border-green-500 border-solid">
        <h4 className="leading-[28px] text-[20px] uppercase">{rewatch.name}</h4>
        <div className="flex italic w-[165px]">
          <svg
            className="w-[15px] h-[15px] mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <path
              fill="#000000"
              d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
            />
          </svg>
          <p className="">
            {moment(rewatch.updated_at).format('hh:mm') +
              ' Ngày ' +
              moment(rewatch.updated_at).format('DD/MM/yyyy')}
          </p>
        </div>
      </div>
      <div className="p-[12px] w-full">
        {/* <VideoPlayer src={filterUrl(rewatch.video_url)} /> */}
        <VideoPlayer
          src={filterUrl2(
            'https://vb90xltcvg.nsnd.live/live/_definst_/stream_1_1bda7@daoSD/playlist.m3u8'
          )}
        />
      </div>
      <div className="article-news block px-5 pt-[-15px]">
        <p className="mt-10" dangerouslySetInnerHTML={{ __html: rewatch.content }}></p>
      </div>
    </>
  );
};

const filterUrl = (url?: string) => {
  return `https://stream.vinitran1245612.workers.dev?apiurl=${url}&is_m3u8=true`;
};

const filterUrl2 = (url?: string) => {
  const updatedUrl = url ? url.replace(/playlist\.m3u8|index\.m3u8/g, 'chunklist.m3u8') : '';
  return `https://stream.vinitran1245612.workers.dev?apiurl=${updatedUrl}&is_m3u8=true`;
};

interface IRewatchDetail {
  id: string;
  name: string;
  video_url: string;
  link: string;
  description: string;
  feature_image: string;
  category: string;
  created_at: string;
  updated_at: string;
  content: string;
}
