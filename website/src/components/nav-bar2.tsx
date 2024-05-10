import { SyntheticEvent, useEffect, useState } from 'react';
import { navBarList } from '../consts/nav-bar.const';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Button, styled } from '@mui/material';
import { LoginModal } from './login-modal';
import { _axios, axiosConfiguration } from '../configs/axiosconfiguartor';
import { RegisterModal } from './register-modal';
import { IFormRegister } from '../interfaces/entites/form-register';
import { toast } from 'react-toastify';
import { UserInforModal } from './user-info-modal';
import { IUserInfo } from '../interfaces/entites/user-info';
import { apis } from '../consts/api.const';
import { localStorageKey } from '../consts/local-storage-key.const';

type Props = {
  children?: any;
};

export const NavBar = (props: Props) => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(0);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenUserInfo, setIsOpenUserInfo] = useState(false);
  const [userInfo, setUserInfo] = useState<IUserInfo | undefined>({
    username: '',
    name: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNavChange = (event?: React.SyntheticEvent | undefined, newValue?: number) => {
    const filterResult = navBarList.filter((navBar) => navBar.id === newValue);

    if (filterResult.length === 1) {
      setNav(filterResult[0].id);
      navigate(`${filterResult[0].url}`);
      console.log('seted');
    }
  };

  interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
  }

  const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
  ))({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      gap: '80px'
      // backgroundColor: 'transparent'
    },
    '& .MuiTabs-indicatorSpan': {
      width: '100%'
      // backgroundColor: '#635ee7'
    }
  });

  interface StyledTabProps {
    label: string;
  }

  const StyledTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} onClick={() => {}} />
  ))(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(15),
    // marginRight: theme.spacing(1),
    margin: theme.spacing('2px 4px 0 4px'),
    padding: theme.spacing('0 2px 0 2px'),
    color: 'white',
    cursor: 'pointer',
    // color: 'rgba(255, 255, 255, 0.7)',
    // backgroundColor: '#e6ffe6',
    '&.Mui-selected': {
      color: 'white'
    }
    // '&.Mui-focusVisible': {
    //   backgroundColor: 'rgba(100, 95, 228, 0.32)'
    // }
  }));

  // FUNCTION
  const fetchLogin = async (username: string, password: string) => {
    setIsLoading(true);
    _axios
      .post(apis.auth.login(), { username: username, password: password })
      .then(async (res) => {
        if (res) {
          if (res.data && res.data.data) {
            axiosConfiguration.setAxiosToken(res.data.data, true);
            localStorage.setItem(localStorageKey.token, res.data.data);
            toast.success('Đăng nhập thành công', {
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light'
            });
          }
        }
        await fetchUserInfo();
        setIsOpenLogin(false);
        window.dispatchEvent(new Event('onChangeAuthentication'));
      })
      .catch((err) => {
        toast.warning(err.response.data.message, {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const fetchRegister = async (formRegister: IFormRegister) => {
    setIsLoading(true);
    _axios
      .post(apis.auth.register(), {
        username: formRegister.username,
        name: formRegister.name,
        email: formRegister.email,
        password: formRegister.password
      })
      .then((res) => {
        if (res) {
          toast.success('Đăng kí tài khoản thành công', {
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          });
        }
        setIsOpenRegister(false);
        setIsOpenLogin(true);
      })
      .catch((err) => {
        toast.warning(err.response.data.message, {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const fetchUserInfo = () => {
    _axios
      .get(apis.auth.me())
      .then((res) => {
        if (res) {
          setUserInfo({
            username: res.data.data.username,
            name: res.data.data.name,
            email: res.data.data.email
          });
        }
      })
      .catch(() => {});
  };

  return (
    <>
      <div className="nav-bar text-white grid grid-cols-3 gap-4 place-items-stretch px-[4px]">
        <div
          className="flex items-center cursor-pointer gap-[8px] my-[2px]"
          onClick={() => {
            navigate('/');
          }}>
          <div className="text-[28px] logo italic flex items-center">TIN BÓNG ĐÁ</div>
          <img className="h-[40px]" src={require('../assets/image/logo4.png')} alt="" />
        </div>
        <div className="flex-1 flex items-center justify-center uppercase col-start-2">
          {navBarList.map((item) => {
            return (
              <button
                className="min-w-[120px] h-full py-[2px] bg-transparent text-bold text-[20px] text-white"
                onClick={() => {
                  navigate(item.url);
                }}>
                {item.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center justify-end gap-2 mr-[8px] col-start-3">
          {!localStorage.getItem(localStorageKey.token) ? (
            <>
              <button
                className="w-[100px] h-[40px] py-[2px] bg-[#008A00] rounded-[8px] text-white"
                onClick={() => {
                  setIsOpenLogin(!isOpenLogin);
                }}>
                Đăng nhập
              </button>
              <button
                className="w-[100px] h-[40px] py-[2px] bg-[#008A00] rounded-[8px] text-white"
                onClick={() => {
                  setIsOpenRegister(!isOpenRegister);
                }}>
                Đăng kí
              </button>
            </>
          ) : (
            <>
              <div
                onClick={() => {
                  setIsOpenUserInfo(true);
                }}
                className="cursor-pointer boxshadow-main rounded-[50%] border-solid border-[2px] border-[--color-second] p-2 flex items-center justify-center">
                <svg
                  className="w-[18px] h-[18px]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512">
                  <path
                    fill="white"
                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                  />
                </svg>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {isOpenLogin ? (
        <LoginModal
          isLoading={isLoading}
          onSubmit={(username: string, password: string) => {
            fetchLogin(username, password);
          }}
          onCancel={() => {
            setIsOpenLogin(false);
          }}
        />
      ) : (
        <></>
      )}
      {isOpenRegister ? (
        <RegisterModal
          isLoading={isLoading}
          onSubmit={(formRegister: IFormRegister) => {
            fetchRegister(formRegister);
          }}
          onCancel={() => {
            setIsOpenRegister(false);
          }}
        />
      ) : (
        <></>
      )}
      {isOpenUserInfo && (
        <UserInforModal
          userInfo={userInfo}
          onLogout={() => {
            axiosConfiguration.deleteAxiosToken();
            setUserInfo(undefined);
            setIsOpenUserInfo(false);
            localStorage.removeItem(localStorageKey.token);
            window.dispatchEvent(new Event('onChangeAuthentication'));
            toast.success('Đã đăng xuất');
          }}
          onCancel={() => {
            setIsOpenUserInfo(false);
            console.log('isOpenUserInfo:', isOpenUserInfo);
          }}
        />
      )}
    </>
  );
};
