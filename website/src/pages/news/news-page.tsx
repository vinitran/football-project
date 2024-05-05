import React, { useEffect, useState } from 'react';
import { useAxios } from '../../hooks/use-axios';
import { IPagination } from '../../interfaces/entites/pagination';
import { INews } from '../../interfaces/entites/news';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/commons/loading';
import { _axios, axiosConfiguration } from '../../configs/axiosconfiguartor';
import axios from 'axios';
import { apis } from '../../consts/api.const';
import { HotBar } from '../../components/hot-bar';
import { SearchBar } from '../../components/search-bar';

type Props = {};

export const NewPage = (props: Props) => {
  const [searching, setSearching] = useState('');
  const [pagination, setPagination] = useState<IPagination>({ pageNum: 1, pageSize: 12 });
  const [resListNews, setResListNews] = useState([]);
  const [resTotalListNews, setResTotalListNews] = useState(0);
  const [resHotNews, setResHotNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // FUNCTION
  const fetchListNews = async () => {
    setLoading(true);
    const res1 = await _axios.get(
      apis.news.list({ limit: pagination.pageSize, page: pagination.pageNum, search: searching })
    );
    if (res1) {
      setResListNews(res1.data?.data ?? []);
    }
    setLoading(false);
  };
  const fetchTotalListNews = async () => {
    const res1 = await _axios.get(apis.rewatch.count());
    if (res1) {
      setResTotalListNews(res1.data?.data ?? 0);
    }
  };
  const fetchHotNews = async () => {
    const res1 = await _axios.get(apis.news.hot());
    if (res1) {
      setResHotNews(res1.data?.data ?? []);
    }
  };

  useEffect(() => {
    fetchListNews();
    fetchTotalListNews();
    fetchHotNews();
  }, []);

  useEffect(() => {
    fetchListNews();
  }, [searching, pagination]);

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPagination({ ...pagination, pageNum: value });
  };
  return (
    <>
      <div className="flex flex-col gap-[12px]">
        <SearchBar placeholder="Tìm kiếm tin tức" onSearch={(value) => setSearching(value)} />
        {resListNews && resListNews.length > 0 && !loading ? (
          <>
            <div className="flex flex-row gap-4">
              <div className="flex-1 flex flex-col items-center justify-start gap-1 h-full">
                <div className="grid grid-cols-3 w-fit gap-2">
                  {resListNews.map((item: INews, index: number) => (
                    <ItemNews news={item}></ItemNews>
                  ))}
                </div>
                <Pagination
                  color="primary"
                  count={
                    resTotalListNews ? Math.ceil(resTotalListNews / pagination.pageSize) : 0
                  }
                  className='cursor-pointer'
                  page={pagination.pageNum}
                  onChange={handlePaginationChange}
                />
              </div>

              <div className="flex flex-col w-[400px]">
                {resHotNews ? (
                  <HotBar
                    title="Tin nổi bật"
                    ids={resHotNews}
                    urlDetail={apis.news.detail}
                    urlClick="/new-detail/"
                  />
                ) : (
                  <div className="flex items-center justify-center">
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
      <p className="w-full text-ellipsis truncate ">{news.name}</p>
    </div>
  );
};
