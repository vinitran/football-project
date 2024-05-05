import { useNavigate } from 'react-router-dom';
import { apis } from '../consts/api.const';
import { useAxios } from '../hooks/use-axios';
import { useEffect, useState } from 'react';
import { _axios } from '../configs/axiosconfiguartor';

export const HotBar = ({
  title,
  ids,
  urlDetail
}: {
  title: string;
  ids: string[];
  urlDetail: string;
}) => {
  return (
    <>
      <div className="flex items-center mt-[12px] ml-4 mb-[18px] pl-4 border-l-4 border-green-500 border-solid uppercase">
        <h4 className="leading-5 text-[20px]">{title}</h4>
      </div>
      {ids
        ? ids.map((item, index) => (
            <>
              <HotItem id={item} urlDetail={urlDetail} />
            </>
          ))
        : ''}
    </>
  );
};

const HotItem = ({ id, urlDetail }: { id: string; urlDetail: any }) => {
  const navigate = useNavigate();
  const [data, setData] = useState<IHotItem | undefined>();
  const fetchData = async () => {
    const res = await _axios.get(urlDetail({ id: id }));
    if (res) {
      setData(res.data?.data ?? undefined);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {data ? (
        <div
          onClick={() => {
            navigate(`/new-detail/${data.id}`);
          }}
          className="flex flex-row items-start justify-start mx-[15px] mt-[15px] w-[350px] h-[90px] gap-2 overflow-hidden bg-[--color-background-content] cursor-pointer">
          <img className="w-[120px] h-[75px]" src={data.feature_image} alt="" />
          <div className="w-[192px] overflow-hidden line-clamp-3">
            <p className="">{data.name}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

interface IHotItem {
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
