import React, { useState } from 'react';
import { useAxios } from '../../hooks/use-axios';
import { IPagination } from '../../interfaces/entites/pagination';
import { INews } from '../../interfaces/entites/news';
import { Box, CircularProgress, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/commons/loading';

type Props = {};

export const NewPage = (props: Props) => {
  const [pagination, setPagination] = useState<IPagination>({ pageNum: 1, pageSize: 12 });
  const [{ data, loading }] = useAxios({
    url: `news/vebotv/list/news/${pagination.pageNum}`
  });

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPagination({ ...pagination, pageNum: value });
  };
  return (
    <>
      <div className="flex flex-col items-center justify-start gap-1 h-full">
        <div className="grid grid-cols-3 w-fit gap-2">
          {data && !loading ? (
            data.data.list.map((item: INews, index: number) => <ItemNews news={item}></ItemNews>)
          ) : (
            <div className="col-start-2 flex items-center justify-center h-[500px]">
              <Loading />
            </div>
          )}
        </div>
        <Pagination
          color="primary"
          count={data?.data?.total ? Math.ceil(data.data.total / pagination.pageSize) : 0}
          page={pagination.pageNum}
          onChange={handlePaginationChange}
        />
      </div>
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
