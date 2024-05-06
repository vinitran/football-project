import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWatchlist } from '../context/watch-list.context';
import { Spinner } from '../components/shared/Spinner';
import { Opener } from '../components/shared/Opener';
import { MatchCard } from '../components/shared/Home/Card';

const PageWrapper = styled.div`
  padding-bottom: 12rem;
`;

const PageLoading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const BoxContent = styled.div``;

const WrapperList = styled.div`
  display: flex;
  justify-content: left;
  margin: 0 -10px;
  flex-wrap: wrap;
  font-family: Roboto, Arial;
  min-height: 100%;
  color: #eee;
  overflow-x: hidden;
  font-size: 14px;
  line-height: 1.4em;
  font-weight: 400;
  padding: 0;
  margin: 0;
  text-size-adjust: none;
  -webkit-text-size-adjust: none;
  text-align: left;
`;
interface HomeProps {
  featured: Api.TVDetails;
  trending: Api.TV[];
  genres: Api.Genre[];
}

interface Match {
  status: number;
  data: MatchModule.Matchs[];
}

export const HomePage: React.FC<HomeProps> = () => {
  const { loading: watchlistLoading } = useWatchlist();

  const [matches, setMatches] = useState<MatchModule.Matchs[] | null>(null);
  const [inWatch, setInWatch] = useState(false);

  const fetchMatchData = async () => {
    try {
      const response = await fetch('https://api.vebo.xyz/api/match/featured');
      const data = (await response.json()) as Match;
      const response1 = await fetch('https://live.vebo.xyz/api/match/live');
      const data1 = (await response1.json()) as Match;

      const map1 = new Map(data1?.data.map((item) => [item.id, item]));
      const updatedData = data?.data.map((item) => (map1.has(item.id) ? map1.get(item.id)! : item));

      setMatches(updatedData);
      setInWatch(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchLiveData = async () => {
    try {
      const response = await fetch('https://live.vebo.xyz/api/match/live');
      const data = (await response.json()) as Match;
      const map1 = new Map(data?.data.map((item) => [item.id, item]));
      const updatedData = matches?.map((item) => (map1.has(item.id) ? map1.get(item.id)! : item));
      setMatches(updatedData as MatchModule.Matchs[]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchMatchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('asdasd');
      fetchLiveData();
    }, 30000);
    return () => clearInterval(intervalId);
  }, [inWatch]);

  return (
    <div className="schedule-battle">
      {/* <Meta
        title="Trang VINITRAN.COM livestream bóng đá trực tuyến"
        description="Xem VINITRAN.COM trực tiếp bóng đá nhanh nhất. Link Vinitran.com bóng đá nhanh miễn phí cùng kết quả, lịch thi đấu mới nhất"
      /> */}
      {watchlistLoading ? (
        <PageLoading>
          <Spinner />
        </PageLoading>
      ) : (
        <div className="relative mt-[-24px] mb-[-26px]">
          <div className="relative h-[705px]">
            <img
              className="absolute w-full"
              src={require('../assets/image/bg3.jpg')}
              alt=""
            />
            <div className="absolute flex items-center justify-center w-full h-fit pt-[10px]">
              <WrapperList className='content-list-battle'>
                {matches?.map((item) => (
                  // item.is_live &&
                  <MatchCard data={item} key={item.id} />
                ))}
              </WrapperList>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BackgoundLayout = () => {
  return (
    <>
      <img
        className="relative h-[1000px] w-full opacity-[1] z-[-1] my-[-24px]"
        src={
          'https://res.cloudinary.com/de5wwikci/image/upload/v1708802621/wallpaperflare.com_wallpaper_sxusl3.jpg'
        }
        alt=""
      />
    </>
  );
};
