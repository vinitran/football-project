import { useNavigate } from 'react-router-dom';
import { apis } from '../consts/api.const';
import { useAxios } from '../hooks/use-axios';
import { useEffect, useState } from 'react';
import { _axios } from '../configs/axiosconfiguartor';
import { Loading } from './commons/loading';
import { NoData } from './commons/nodata';

export const HotBar = ({
  title,
  urlClick,
  urlList
}: {
  title: string;
  urlClick: string;
  urlList: string;
}) => {
  const [listHot, setListHot] = useState<IHotItem[]>([]);
  const fetchListItemHot = () => {
    if (urlList) {
      _axios
        .get(urlList)
        .then((res) => {
          if (res?.data?.data) {
            setListHot(res?.data?.data);
          }
        })
        .catch(() => {});
    }
  };

  useEffect(() => {
    fetchListItemHot();
  }, []);

  return (
    <>
      <div className="flex items-center mt-[12px] ml-4 mb-[18px] pl-4 border-l-4 border-green-500 border-solid uppercase">
        <h4 className="leading-5 text-[20px]">{title}</h4>
      </div>
      {!!listHot.length ? (
        listHot.map((item, index) => (
          <>
            <HotItem data={item} urlClick={urlClick} />
          </>
        ))
      ) : (
        <div className="flex items-center justify-center">
          <NoData />
        </div>
      )}
    </>
  );
};

const HotItem = ({ data, urlClick }: { data: IHotItem; urlClick: string }) => {
  const navigate = useNavigate();

  return (
    <>
      {data ? (
        <div
          onClick={() => {
            navigate(`${urlClick}${data.id}`);
          }}
          className="flex flex-row items-start justify-start mx-[15px] mt-[15px] w-full h-[90px] gap-2 overflow-hidden bg-[--color-background-content] cursor-pointer">
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
