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
import { HotBar } from '../../components/hot-bar-list';
import { SearchBar } from '../../components/search-bar';
import { localStorageKey } from '../../consts/local-storage-key.const';

type Props = {};

export const NewPage = (props: Props) => {
  const [searching, setSearching] = useState('');
  const [pagination, setPagination] = useState<IPagination>({ pageNum: 1, pageSize: 12 });
  const [resListNews, setResListNews] = useState([]);
  const [resTotalListNews, setResTotalListNews] = useState(0);
  const [resHotNews, setResHotNews] = useState([]);
  const [resRecommentNews, setResRecommentNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(localStorage.getItem(localStorageKey.token));

  // FUNCTION
  const fetchListNews = async () => {
    setLoading(true);
    _axios
      .get(
        apis.news.list({ limit: pagination.pageSize, page: pagination.pageNum, search: searching })
      )
      .then((res) => {
        if (res) {
          setResListNews(res.data?.data ?? []);
        }
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const fetchTotalListNews = async () => {
    _axios
      .get(apis.rewatch.count())
      .then((res) => {
        if (res) {
          setResTotalListNews(res.data?.data ?? 0);
        }
      })
      .catch(() => {});
  };
  const fetchHotNews = async () => {
    _axios
      .get(apis.news.hot())
      .then((res) => {
        if (res) {
          setResHotNews(res.data?.data ?? []);
        }
      })
      .catch(() => {});
  };
  const fetchRecommentNews = async () => {
    if (token) {
      axiosConfiguration.setAxiosToken(token, true);
      await _axios
        .get(apis.news.recomment())
        .then((res) => {
          if (res) {
            setResRecommentNews(res.data?.data ?? []);
          }
        })
        .catch(() => {});
    } else {
      setResRecommentNews([]);
    }
  };

  // EFFECT
  useEffect(() => {
    fetchListNews();
    fetchTotalListNews();
    fetchHotNews();
    fetchRecommentNews();
  }, []);

  useEffect(() => {
    fetchListNews();
    fetchTotalListNews();
  }, [searching, pagination]);

  useEffect(() => {
    fetchRecommentNews();
  }, [token]);

  // LISTENER
  window.addEventListener('onChangeAuthentication', () => {
    setToken(localStorage.getItem(localStorageKey.token));
  });

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPagination({ ...pagination, pageNum: value });
  };
  return (
    <>
      <div className="flex flex-col gap-[12px]">
        <SearchBar placeholder="Tìm kiếm tin tức" onSearch={(value) => setSearching(value)} />
        {resListNews && resListNews.length > 0 && !loading ? (
          <>
            <div className="flex flex-row gap-4 p-[24px]">
              <div className="flex-1 flex flex-col items-center justify-start gap-1 h-full">
                <div className="grid grid-cols-3 w-fit gap-2">
                  {resListNews.map((item: INews, index: number) => (
                    <ItemNews news={item}></ItemNews>
                  ))}
                </div>
                <Pagination
                  color="primary"
                  count={resTotalListNews ? Math.ceil(resTotalListNews / pagination.pageSize) : 0}
                  className="cursor-pointer"
                  page={pagination.pageNum}
                  onChange={handlePaginationChange}
                />
              </div>

              <div className="flex flex-col w-[350px]">
                {!!resRecommentNews.length ? (
                  <HotBar
                    title="Tin đề xuất"
                    urlClick="/new-detail/"
                    urlList={getUrlListNewsHot(resRecommentNews)}
                  />
                ) : (
                  <div className="flex flex-col items-start justify-center w-full">
                    <div className="flex items-center mt-[12px] ml-4 mb-[18px] pl-4 border-l-4 border-green-500 border-solid uppercase">
                      <h4 className="leading-5 text-[20px]">Tin đề xuất</h4>
                    </div>
                    <div className="flex justify-center w-full">
                      <p>Đăng nhập để xem tin mà bạn có thể sẽ thích</p>
                    </div>
                  </div>
                )}
                {!!resHotNews.length ? (
                  <HotBar
                    title="Tin nổi bật"
                    urlClick="/new-detail/"
                    urlList={getUrlListNewsHot(resHotNews)}
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

const getUrlListNewsHot = (news_ids: string[]) => {
  return apis.news.list({ news_ids: news_ids });
};
