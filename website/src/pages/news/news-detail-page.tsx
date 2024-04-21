import { useParams } from 'react-router-dom';
import { useAxios } from '../../hooks/use-axios';
import { Loading } from '../../components/commons/loading';

export const NewsDetailPage = () => {
  const params = useParams();
  const [{ response, loading }] = useAxios({
    url: `news/vebotv/detail/${params.id}`
  });
  return (
    <>
      <div className="">
        {!loading && response ? (
          <NewsDetailContent news={response.data} />
        ) : (
          <div className="col-start-2 flex items-center justify-center h-[500px]">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
};

const NewsDetailContent = (news: any) => {
  return (
    <div>
      <p className="">{news}</p>
    </div>
  );
};

interface INewsDetail {
  id: string
  name: string
  video_url: string
  description: string
  feature_image: string
  category: string
  created_at: string
  updated_at: string
  content: string
}
