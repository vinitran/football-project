import { useEffect, useState } from 'react';
import { _axios } from '../../configs/axiosconfiguartor';
import { apis } from '../../consts/api.const';
import { Loading } from '../../components/commons/loading';
import { useNavigate } from 'react-router-dom';
import { localStorageKey } from '../../consts/local-storage-key.const';
import moment from 'moment';
type Props = {};

export const LivePage = (props: Props) => {
  const navigate = useNavigate();
  const [resLives, setResLives] = useState<Live[]>([]);

  // API
  const fetchLive = () => {
    _axios
      .get(apis.live.list({ limit: 12, page: 1, isLive: true, isFeatured: true }))
      .then((res) => {
        if (res) {
          setResLives(res?.data?.data ?? []);
        }
      })
      .catch(() => {});
  };

  // EFFECT
  useEffect(() => {
    fetchLive();
  }, []);
  return (
    <>
      <div className="live-page flex flex-wrap gap-[16px] text-white items-center justify-center">
        <img
          className="fixed top-0 left-0 right-0 bottom-0 z-[-1] w-full"
          src={require('../../assets/image/bg3.jpg')}
          alt=""
        />
        {resLives
          .sort((a, b) => {
            if (a.is_live) return -1;
            if (b.is_live) {
              return 1;
            } else {
              return 0;
            }
          })
          .map((live) => (
            <div
              onClick={() => {
                if (live.is_live) {
                  localStorage.setItem(localStorageKey.liveTournamentName, live.tournament.name);
                  localStorage.setItem(localStorageKey.liveHomeName, live.home.name);
                  localStorage.setItem(localStorageKey.liveAwayName, live.away.name);
                  navigate('/watch/' + live.id);
                }
              }}
              className={`${live.is_live ? 'cursor-pointer' : ''} w-[308px] h-[160px] flex flex-col items-center relative bg-[#3F4148] rounded-[8px]`}>
              {live.is_live ? <div className="absolute live-tag">live</div> : <></>}

              {/* TOURNAMENT */}
              <div className="live-tournament-name">
                <p>{live.tournament.name}</p>
              </div>
              <div className="flex-1 grid grid-cols-3 content-stretch py-[15px] px-[10px] w-full h-full">
                {/* HOME */}
                <div className="col-start-1 flex flex-col items-center justify-start  ">
                  <img
                    className="h-[60px] w-[60px]"
                    src={live.home.logo ? live.home.logo : require('../../assets/image/live1.png')}
                    alt=""
                  />
                  <p className="text-center text-[14px] font-live-item">{live.home.name}</p>
                </div>
                {/* SCORE */}
                {live.is_live ? (
                  <div className="mt-[12px] col-start-2 flex flex-col items-center justify-start font-live-item text-[23px] gap-[4px]">
                    <p>{`${live.scores.home} - ${live.scores.away}`}</p>
                    <p className="text-[12px] text-green-500">{live.parse_data?.time}</p>
                  </div>
                ) : (
                  <div className="mt-[12px] col-start-2 flex flex-col items-center justify-start font-live-item text-[23px] gap-[4px]">
                    <p className="text-[16px]">
                      {moment(live.timestamp).add(3, 'hours').format('DD-MM-YYYY')}
                    </p>
                    <p className="text-[16px]">
                      {moment(live.timestamp).add(3, 'hours').format('HH:mm')}
                    </p>
                  </div>
                )}
                {/* AWAY */}
                <div className="col-start-3 flex flex-col items-center justify-start">
                  <img
                    className="h-[60px] w-[60px]"
                    src={live.away.logo ? live.away.logo : require('../../assets/image/live1.png')}
                    alt=""
                  />
                  <p className="text-center text-[14px] font-live-item">{live.away.name}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
export interface Live {
  id: string;
  date: string;
  is_live: boolean;
  timestamp: number;
  parse_data?: {
    time?: string;
  };
  tournament: {
    name: string;
  };
  home: {
    name: string;
    logo: string;
  };
  away: {
    name: string;
    logo: string;
  };
  scores: {
    home: number;
    away: number;
  };
}
