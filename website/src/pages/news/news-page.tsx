import React, { useEffect, useState } from 'react';
import { useAxios } from '../../hooks/use-axios';
import { IPagination } from '../../interfaces/entites/pagination';
import { INews } from '../../interfaces/entites/news';
import { Box, CircularProgress, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/commons/loading';
import { _axios, axiosConfiguration } from '../../configs/axiosconfiguartor';
import axios from 'axios';

type Props = {};

export const NewPage = (props: Props) => {
  const [pagination, setPagination] = useState<IPagination>({ pageNum: 1, pageSize: 12 });
  const [{ data, loading }] = useAxios({
    url: `news/vebotv/list/news/${pagination.pageNum}`
  });
  const [dataHot, setDataHot] = useState<any>();

  useEffect(() => {
    if (data && data.data.highlight.id) {
      console.log('into');
      _axios({
        url: `news/vebotv/detail/${data.data.highlight.id}`,
        method: 'GET'
        // headers: {
        //     authorization: "your token comes here",
        // },
        // data: formData,
      })
        .then((res: any) => {
          setDataHot(res);
        })
        .catch((err) => {});

      console.log('dataHotResponse:', dataHot);
    }
  }, [data]);

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPagination({ ...pagination, pageNum: value });
  };
  return (
    <>
      {data && !loading ? (
        <>
          <div className="flex flex-row gap-4">
            <div className="flex-1 flex flex-col items-center justify-start gap-1 h-full">
              <div className="grid grid-cols-3 w-fit gap-2">
                {data.data.list.map((item: INews, index: number) => (
                  <ItemNews news={item}></ItemNews>
                ))}
              </div>
              <Pagination
                color="primary"
                count={data?.data?.total ? Math.ceil(data.data.total / pagination.pageSize) : 0}
                page={pagination.pageNum}
                onChange={handlePaginationChange}
              />
            </div>

            <div className="flex flex-col w-[350px]">
              {dataHot ? (
                <NewsHot news={dataHot.data.data_hot} />
              ) : (
                <div className="w-full flex justify-center">
                  <Loading />
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="col-start-2 flex items-center justify-center h-[500px]">
          <Loading />
        </div>
      )}
    </>
  );
};

const ItemNews = ({ news }: { news: INews }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-start justify-start w-[310px] h-[245px] overflow-hidden cursor-pointer"
      onClick={() => {
        navigate(`/new-detail/${news.id}`);
      }}>
      <img
        className="w-full h-[200px] rounded-md border-solid border-[1px] border-[--color-stroke]"
        src={news.feature_image}
        alt=""
      />
      <p className="w-full text-ellipsis truncate">{news.name}</p>
    </div>
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
