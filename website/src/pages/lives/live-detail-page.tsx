import { useParams } from 'react-router-dom';
import VideoPlayer from '../../components/video-player';
import { _axios } from '../../configs/axiosconfiguartor';
import { apis } from '../../consts/api.const';
import { useEffect, useState } from 'react';
import { Loading } from '../../components/commons/loading';
import { localStorageKey } from '../../consts/local-storage-key.const';

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
    <div className="live-detail-item flex flex-col gap-[16px]">
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
