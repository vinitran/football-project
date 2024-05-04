import { useNavigate, useParams } from 'react-router-dom';
import { useAxios } from '../../hooks/use-axios';
import { Loading } from '../../components/commons/loading';
import ReactPlayer from 'react-player';
import moment from 'moment';

export const RewatchDetailPage = () => {
  const params = useParams();
  const [{ response, loading }] = useAxios({
    url: `news/vebotv/det\ail/${params.id}`
  });
  return (
    <>
      <div className="news-detail flex justify-between p-5">
        {!loading && response ? (
          <>
            <div className="main-left bg-[--color-background-content]">
              <RewatchDetailContent rewatch={response.data.data} />
            </div>
            {/* <div className="flex flex-col w-[350px]">
              <RewatchHot rewatchHot={response.data.data_hot} />
              <RewatchRelative rewatchRelative={response.data.data_related} />
            </div> */}
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
      <div className="flex items-center justify-end ml-4 pl-4">
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
      <div>
        {filterUrl()}
        <ReactPlayer
          playing
          loop
          url={`https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8`}
        />
        <ReactPlayer playing loop url={filterUrl()} />
        {/* <ReactPlayer playing loop url={`http://127.0.0.1:9665/fetchAPI?endpoint=https://obevcimanyd179314182.thapcam.link/live/may9/playlist.m3u8`} /> */}
        {/* <ReactPlayer playing loop url={`https://stream.vinitran1245612.workers.dev?apiurl=${rewatch.video_url}&is_m3u8=true`} /> */}
        {/* <ReactPlayer playing loop controls url="https://www.youtube.com/watch?v=LXb3EKWsInQ" /> */}
        aaaaaaaa
      </div>
      <div className="article-news block px-5 pt-[-15px]">
        <p className="mt-10" dangerouslySetInnerHTML={{ __html: rewatch.content }}></p>
      </div>
    </>
  );
};

const filterUrl = (url?: string) => {
  let tmp =
    'https://obevcimanyd179249207.thapcam.link/live/longFHD/playlist.m3u8';
  tmp = tmp.replace(/playlist\.m3u8|index\.m3u8/g, 'chunklist.m3u8');
  return `https://stream.vinitran1245612.workers.dev?apiurl=${tmp}&is_m3u8=true`;
};

const RewatchHot = ({ rewatchHot }: { rewatchHot: IRewatchDetail[] }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center ml-4 mb-[18px] pl-4 border-l-4 border-green-500 border-solid uppercase">
        <h4 className="leading-5 text-[20px]">Trận đấu nổi bật</h4>
      </div>
      {rewatchHot.map((item, index) => (
        <>
          <div
            onClick={() => {
              navigate(`/new-detail/${item.id}`);
            }}
            className="flex flex-row items-start justify-start mx-[15px] mt-[15px] w-[350px] h-[90px] gap-2 overflow-hidden bg-[--color-background-content] cursor-pointer">
            <img className="w-[120px] h-[75px]" src={item.feature_image} alt="" />
            <div className="w-[192px] overflow-hidden line-clamp-3">
              <p className="">{item.name}</p>
            </div>
          </div>
        </>
      ))}
    </>
  );
};

const RewatchRelative = ({ rewatchRelative }: { rewatchRelative: IRewatchDetail[] }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center mt-[30px] ml-4 mb-[18px] pl-4 border-l-4 border-green-500 border-solid uppercase">
        <h4 className="leading-5 text-[20px]">Trận đấu liên quan</h4>
      </div>
      {rewatchRelative.map((item, index) => (
        <>
          <div
            onClick={() => {
              navigate(`/new-detail/${item.id}`);
            }}
            className="flex flex-row items-start justify-start mx-[15px] mt-[15px] w-[350px] h-[90px] gap-2 overflow-hidden bg-[--color-background-content] cursor-pointer">
            <img className="w-[120px] h-[75px]" src={item.feature_image} alt="" />
            <div className="w-[192px] overflow-hidden line-clamp-3">
              <p className="">{item.name}</p>
            </div>
          </div>
        </>
      ))}
    </>
  );
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
