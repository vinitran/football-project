import { useNavigate, useParams } from 'react-router-dom';
import { useAxios } from '../../hooks/use-axios';
import { Loading } from '../../components/commons/loading';
import moment from 'moment';
import { apis } from '../../consts/api.const';

export const NewsDetailPage = () => {
  const params = useParams();
  const [{ response, loading }] = useAxios({
    // url: `news/vebotv/detail/${params.id}`
    url: apis.news.detail({id: params.id})
  });
  return (
    <>
      <div className="news-detail flex justify-between p-5">
        {!loading && response ? (
          <>
            <div className="main-left bg-[--color-background-content]">
              <NewsDetailContent news={response.data.data} />
            </div>
            {/* <div className="flex flex-col w-[350px]">
              <NewsHot news={response.data.data_hot} />
              <NewsRelative news={response.data.data_related} />
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

const NewsDetailContent = ({ news }: { news: INewsDetail }) => {
  return (
    <>
      <div className="flex items-center justify-between ml-4 pl-4 border-l-4 border-green-500 border-solid">
        <h4 className="leading-[28px] text-[20px] uppercase">{news.name}</h4>
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
            {moment(news.updated_at).format('hh:mm') +
              ' Ngày ' +
              moment(news.updated_at).format('DD/MM/yyyy')}
          </p>
        </div>
      </div>
      <div className="article-news block px-5 pt-[-15px]">
        <p className="mt-10" dangerouslySetInnerHTML={{ __html: news.content }}></p>
      </div>
    </>
  );
};

const NewsHot = ({ news }: { news: INewsDetail[] }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center ml-4 mb-[18px] pl-4 border-l-4 border-green-500 border-solid uppercase">
        <h4 className="leading-5 text-[20px]">Tin nổi bật</h4>
      </div>
      {news.map((item, index) => (
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

const NewsRelative = ({ news }: { news: INewsDetail[] }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center mt-[30px] ml-4 mb-[18px] pl-4 border-l-4 border-green-500 border-solid uppercase">
        <h4 className="leading-5 text-[20px]">Tin liên quan</h4>
      </div>
      {news.map((item, index) => (
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

interface INewsDetail {
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
