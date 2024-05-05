import { useNavigate, useParams } from 'react-router-dom';
import { useAxios } from '../../hooks/use-axios';
import { Loading } from '../../components/commons/loading';
import ReactPlayer from 'react-player';
import moment from 'moment';
import { apis } from '../../consts/api.const';
import { useEffect, useState } from 'react';
import { _axios } from '../../configs/axiosconfiguartor';
import { HotBar } from '../../components/hot-bar';
import VideoPlayer from '../../components/video-player';

export const RewatchDetailPage = () => {
  const params = useParams();
  const [resDetailRewatch, setResDetailRewatch] = useState<any>();
  const [resHotNews, setResHotNews] = useState([]);
  const [resRelativeNews, setRelativeNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // FUNCTION
  const fetchDetailNews = async () => {
    setLoading(true);
    const res1 = await _axios.get(apis.rewatch.detail({ id: params.id }));
    if (res1) {
      setResDetailRewatch(res1.data?.data ?? []);
    }
    setLoading(false);
  };
  const fetchHotNews = async () => {
    const res1 = await _axios.get(apis.news.hot());
    if (res1) {
      setResHotNews(res1.data?.data ?? []);
    }
  };
  const fetchRelativeNews = async () => {
    const res1 = await _axios.get(apis.news.relative({ id: 'YoKxsem' }));
    if (res1) {
      setRelativeNews(res1.data?.data ?? []);
    }
  };
  useEffect(() => {
    fetchDetailNews();
    fetchHotNews();
    fetchRelativeNews();
  }, [params]);

  return (
    <>
      <div className="news-detail flex justify-between p-5">
        {resDetailRewatch && !loading ? (
          <>
            <div className="main-left bg-[--color-background-content] mr-[24px]">
              <RewatchDetailContent rewatch={resDetailRewatch} />
            </div>
            <div className="flex flex-col w-[400px]">
              {resRelativeNews ? (
                <HotBar
                  title="Tin liên quan"
                  ids={resRelativeNews}
                  urlDetail={apis.news.detail}
                  urlClick="/rewatch-detail/"
                />
              ) : (
                <div className="flex items-center justify-center">
                  <Loading />
                </div>
              )}
              {resHotNews ? (
                <HotBar
                  title="Tin nổi bật"
                  ids={resHotNews}
                  urlDetail={apis.news.detail}
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
      <div className='p-[12px]'>
        <VideoPlayer src={filterUrl(rewatch.video_url)} />
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
