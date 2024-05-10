import { useParams } from 'react-router-dom';
import VideoPlayer from '../../components/video-player';
import { _axios } from '../../configs/axiosconfiguartor';
import { apis } from '../../consts/api.const';
import { useEffect, useState } from 'react';
import { Loading } from '../../components/commons/loading';

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
  const [countGetServer, setLoading] = useState(true);

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
      <div className="p-[30px] live-detail">
        {!!meta.length ? (
          <LiveDetailContent meta={meta} />
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

  // EFFECT
  useEffect(() => {
    if (!!meta.length) {
      setServerName(meta.slice(0, 1)[0].name);
      setLiveUrl(meta.slice(0, 1)[0].url);
    }
  }, []);

  return (
    <div className="live-detail-item flex flex-col gap-[8px]">
      <VideoPlayer src={filterUrl2(liveUrl)} />
      {/* <VideoPlayer
        src={filterUrl2(
          'https://vb90xltcvg.nsnd.live/live/_definst_/stream_1_1bda7@daoSD/playlist.m3u8'
        )}
      /> */}
      <div className="flex gap-[4px]">
        {meta.map((item) => {
          return (
            <>
              <button
                className={`w-[100px] h-[40px] py-[2px] rounded-[8px] text-white ${serverName === item.name ? 'button-selected-server' : ' bg-[--color-three]'}`}
                onClick={() => {
                  setServerName(item.name);
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
