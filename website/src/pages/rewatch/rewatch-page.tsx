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
import { toast } from 'react-toastify';

type Props = {};

export const RewatchPage = (props: Props) => {
  const [searching, setSearching] = useState('');
  const [pagination, setPagination] = useState<IPagination>({ pageNum: 1, pageSize: 12 });
  const [resListRewatch, setResListRewatch] = useState([]);
  const [resTotalListRewatch, setResTotalListRewatch] = useState(0);
  const [resHotRewatch, setResHotRewatch] = useState([]);
  const [resRecommentRewatch, setResRecommentRewatch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(localStorage.getItem(localStorageKey.token));

  // FUNCTION
  const fetchListRewatch = async () => {
    setLoading(true);
    _axios
      .get(
        apis.rewatch.list({
          limit: pagination.pageSize,
          page: pagination.pageNum,
          search: searching
        })
      )
      .then((res) => {
        if (res) {
          setResListRewatch(res.data?.data ?? []);
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const fetchTotalListRewatch = async () => {
    
    _axios
      .get(apis.rewatch.count({ search: searching }))
      .then((res) => {
        if (res) {
          setResTotalListRewatch(res.data?.data ?? 0);
        }
      })
      .catch(() => {});
  };
  const fetchHotRewatch = async () => {
    _axios
      .get(apis.rewatch.hot())
      .then((res) => {
        if (res) {
          setResHotRewatch(res.data?.data ?? []);
        }
      })
      .catch(() => {});
  };
  const fetchRecommentRewatch = async () => {
    if (token) {
      axiosConfiguration.setAxiosToken(token, true);
      await _axios
        .get(apis.rewatch.recomment())
        .then((res) => {
          if (res) {
            setResRecommentRewatch(res.data?.data ?? []);
          }
        })
        .catch(() => {});
    } else {
      setResRecommentRewatch([]);
    }
  };

  // EFFECT
  useEffect(() => {
    fetchListRewatch();
    fetchTotalListRewatch();
    fetchHotRewatch();
    fetchRecommentRewatch();
  }, []);

  useEffect(() => {
    fetchListRewatch();
    fetchTotalListRewatch();
  }, [searching, pagination]);

  useEffect(() => {
    fetchRecommentRewatch();
  }, [token]);

  // LISTENER
  window.addEventListener('onChangeAuthentication', () => {
    setToken(localStorage.getItem(localStorageKey.token));
  });

  // EVENT
  const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPagination({ ...pagination, pageNum: value });
  };
  return (
    <>
      <div className="flex flex-col gap-[12px]">
        <SearchBar placeholder="Tìm kiếm trận xem lại" onSearch={(value) => setSearching(value)} />
        {resListRewatch && resListRewatch.length > 0 && !loading ? (
          <>
            <div className="flex flex-row gap-4 p-[24px]">
              <div className="flex-1 flex flex-col items-center justify-start gap-1 h-full">
                <div className="grid grid-cols-3 w-fit gap-2">
                  {resListRewatch.map((item: IRewatchItem, index: number) => (
                    <ItemRewatch rewatchItem={item}></ItemRewatch>
                  ))}
                </div>
                <Pagination
                  color="primary"
                  count={
                    resTotalListRewatch ? Math.ceil(resTotalListRewatch / pagination.pageSize) : 0
                  }
                  className="cursor-pointer"
                  page={pagination.pageNum}
                  onChange={handlePaginationChange}
                />
              </div>

              <div className="flex flex-col w-[350px]">
                {!!resRecommentRewatch.length ? (
                  <HotBar
                    title="Trận đấu đề xuất"
                    urlClick="/rewatch-detail/"
                    urlList={getUrlListRewatchHot(resRecommentRewatch)}
                  />
                ) : (
                  <div className="flex flex-col items-start justify-center w-full">
                    <div className="flex items-center mt-[12px] ml-4 mb-[18px] pl-4 border-l-4 border-green-500 border-solid uppercase">
                      <h4 className="leading-5 text-[20px]">Trận đấu đề xuất</h4>
                    </div>
                    <div className="flex justify-center w-full">
                      <p>Đăng nhập để xem trận đấu mà bạn có thể sẽ thích</p>
                    </div>
                  </div>
                )}
                {!!resHotRewatch.length ? (
                  <HotBar
                    title="Trận đấu nổi bật"
                    urlClick="/rewatch-detail/"
                    urlList={getUrlListRewatchHot(resHotRewatch)}
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

const ItemRewatch = ({ rewatchItem }: { rewatchItem: IRewatchItem }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-start justify-start w-[310px] h-[245px] overflow-hidden cursor-pointer"
      onClick={() => {
        navigate(`/rewatch-detail/${rewatchItem.id}`);
      }}>
      <img
        className="w-full h-[200px] rounded-md border-solid border-[1px] border-[--color-stroke]"
        src={rewatchItem.feature_image}
        alt=""
      />
      <p className="w-full text-ellipsis truncate">{rewatchItem.name}</p>
    </div>
  );
};

const getUrlListRewatchHot = (rematch_ids: string[]) => {
  return apis.rewatch.list({ rematch_ids: rematch_ids });
};

interface IRewatchItem {
  id: string;
  name: string;
  feature_image: string;
}
